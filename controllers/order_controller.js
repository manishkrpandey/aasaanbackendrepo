const express = require('express');
const orderModel = require('../models/order_model');
const validation = require('../models/validation');
const symbols = require('../config/symbols');
const io = require('../config/socket');
const common = require('../lib/common');
const router = express.Router();

// ??? isAuthenticated
router.post(symbols.POST_ORDER_PLACED, function (req, res){
    var data = {};
    console.log("order here");
    data['customer_id'] = symbols.REQUEST_DATA['customer_id'];
    data['customer_address_id'] = symbols.REQUEST_DATA['customer_address_id'];
    data['restaurant_id'] = symbols.REQUEST_DATA['restaurant_id'];
    data['order_list'] = JSON.stringify(symbols.REQUEST_DATA['order_list']);
    data['razor_pay_transaction_id'] = symbols.REQUEST_DATA['razor_pay_transaction_id'];
    data['is_paid'] = symbols.REQUEST_DATA['is_paid'];
    data['original_amount'] = symbols.REQUEST_DATA['original_amount'];
    data['discount'] = symbols.REQUEST_DATA['discount'];
    data['amount_to_be_paid'] = symbols.REQUEST_DATA['amount_to_be_paid'];
    data['delivery_related_hint'] = symbols.REQUEST_DATA['delivery_related_hint'];
    data['special_request'] = symbols.REQUEST_DATA['special_request'];
    data['order_status_id'] = symbols.ORDER_STATUS_PLACED;
    orderModel.orderPlaced(data,function(insertId){
        if(insertId > 0){
            data['order_id'] = insertId;
            try{
                pushNotification(insertId, symbols.SOCKET_ACTION_PLACED);
                common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Order Placed',{'id':insertId});    
            }catch (err) {
                //??? log error
                common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Order not placed');
            }
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Order not placed');        
        }
    });
});

router.post(symbols.POST_ORDER_CONFIRMED, function (req, res){
    try{
        orderModel.orderConfirmed(function(status){
            if(status){
                orderModel.orderGet(function(orderData){
                    if(orderData){
                        pushNotification(symbols.REQUEST_DATA['id'], symbols.SOCKET_ACTION_CONFIRMED);
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Order Confirmed');    
                        orderModel.assignDeliveryBoy(orderData[0],function(assignmentStatus){
                            if(!assignmentStatus){
                                console.log("not assigned");
                                orderModel.assignDeliveryBoy(orderData[0],function(assignmentStatus){
                                    if(!assignmentStatus){
                                        console.log("not assigned");
                                        pushNotification(symbols.REQUEST_DATA['id'], symbols.SOCKET_ACTION_DELIVERY_BOY_ASSIGN_FAILED);
                                    }else{
                                        console.log("assigned");
                                        pushNotification(symbols.REQUEST_DATA['id'], symbols.SOCKET_ACTION_DELIVERY_BOY_ASSIGNED);
                                    }
                                });
                            }else{
                                console.log("assigned");
                                pushNotification(symbols.REQUEST_DATA['id'], symbols.SOCKET_ACTION_DELIVERY_BOY_ASSIGNED);
                            }
                        });
                    }else{
                        pushNotification(symbols.REQUEST_DATA['id'], symbols.SOCKET_ACTION_REJECTED);
                        // ??? log
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Order Confirmation failed');
                    }
                });
            }else{
                pushNotification(symbols.REQUEST_DATA['id'], symbols.SOCKET_ACTION_REJECTED);
                common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Order rejected');        
            }
        });
    
    }catch(err){
        pushNotification(symbols.REQUEST_DATA['id'], symbols.SOCKET_ACTION_REJECTED);
        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Order failed');
        //??? log
    }
});

router.post(symbols.POST_ORDER_PICKED, function (req, res){
    order_id = symbols.REQUEST_DATA['id'];
    orderModel.orderPicked(function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Order Picked');    
        }else{
            orderModel.orderPicked(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Order Picked');
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Order could not picked');
                }
            });
        }
    });
    pushNotification(order_id, symbols.ORDER_STATUS_PICKED);
});

router.post(symbols.POST_ORDER_DELIVERED, function (req, res){
    order_id = symbols.REQUEST_DATA['id'];
    orderModel.orderDelivered(function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Order Delivered');    
        }else{
            orderModel.orderDelivered(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Order Delivered');
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Order Delivery issue');
                }
            });
        }
    });
    pushNotification(order_id, symbols.ORDER_STATUS_DELIVERED);
});

router.post(symbols.POST_ORDER_GET, function (req, res){
    orderModel.orderGet(function(orderData){
        if(orderData){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Orders',orderData);    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Order could not fetched');
        }
    });
});

router.post(symbols.POST_ORDER_REJECTED, function (req, res){
    order_id = symbols.REQUEST_DATA['id'];
    orderModel.orderRejected(function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Order Rejected');    
        }else{
            orderModel.orderPicked(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Order Rejected');
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Order Rejection failed');
                }
            });
        }
    });
    pushNotification(order_id, symbols.ORDER_STATUS_REJECTED);
});

function pushNotification(order_id, action){
    symbols.REQUEST_DATA = {};
    symbols.REQUEST_DATA['id'] = order_id;
    try{
        orderModel.orderGet(function(orderData){
            if(orderData){
                io.getIO().emit('orders', {
                    action: action,
                    detail: orderData
                    });
            }else{
                orderModel.orderGet(function(orderData){
                    if(orderData){
                        io.getIO().emit('orders', {
                            action: action,
                            detail: orderData
                            });
                    }else{
                        orderModel.orderGet(function(orderData){
                            if(orderData){
                                io.getIO().emit('orders', {
                                    action: action,
                                    detail: orderData
                                    });
                            }else{
                                //??? log
                            }
                        });
                    }
                });
            }
        });
    }catch(err){
        //??? log
    }
}

module.exports = router