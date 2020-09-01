const dbManager = require('../config/db_manager');
const symbols = require('../config/symbols');
const common = require('../lib/common');
const restaurantModel = require('./restaurant_model');
const employeeModel = require('./employee_model');
const { TABLE_ORDERS } = require('../config/symbols');

module.exports.orderPlaced = function(data, callback) {
    dbManager.insertData(symbols.TABLE_ORDERS, data)
        .then( insertId => {
            callback(insertId);
        })
        .catch(err=>{
            callback(0);
            console.log(err);
            //??? log error
        });
}


module.exports.orderConfirmed = function(callback) {
    var data = {};
    data['order_status_id'] = symbols.ORDER_STATUS_CONFIRMED;
    data['id'] = symbols.REQUEST_DATA['id'];
    data['estimated_delivery_time'] = symbols.REQUEST_DATA['estimated_delivery_time'];
    dbManager.updateData(symbols.TABLE_ORDERS,data)
        .then( success => {

            callback(true);
        })
        .catch(err=>{
            module.exports.orderRejected(function(status){
                if(!status){
                    module.exports.orderRejected(function(status){
                        if(!status){
                            //??? log error
                        }
                    });
                }
            });
            callback(false);
            //??? log error
        });
}

module.exports.orderRejected = function(callback) {
    var data = {};
    data['order_status_id'] = symbols.ORDER_STATUS_REJECTED;
    data['id'] = symbols.REQUEST_DATA['id'];

    dbManager.updateData(symbols.TABLE_ORDERS,data)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.orderPicked = function(callback) {
    var data = {};
    data['order_status_id'] = symbols.ORDER_STATUS_PICKED;
    data['id'] = symbols.REQUEST_DATA['id'];
    dbManager.updateData(symbols.TABLE_ORDERS,data)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.orderDelivered = function(callback) {
    var data = {};
    data['order_status_id'] = symbols.ORDER_STATUS_DELIVERED;
    data['id'] = symbols.REQUEST_DATA['id'];
    employee_id = symbols.REQUEST_DATA['employee_id'];
    dbManager.updateData(symbols.TABLE_ORDERS,data)
        .then( success => {
            var data = {};
            data['is_available'] = 1;
            data['employee_id'] = employee_id;
            dbManager.updateData(symbols.TABLE_AVAILABILITY,data)
                .then( success => {
                    callback(true);
                })
                .catch(err=>{
                    callback(false);
                    //??? log error
                });
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.orderGet = function(callback) {
    dbManager.getData('', TABLE_ORDERS)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.assignDeliveryBoy = function(orderData, callback) {
    
    sql_delivery_boy = "SELECT e.id,et.latitude,et.longitude FROM " + symbols.TABLE_EMPLOYEES + " e INNER JOIN "+ symbols.TABLE_EMPLOYEE_TRACK +" et ON e.id = et.employee_id INNER JOIN "+ symbols.TABLE_AVAILABILITY +" a ON e.id = a.employee_id  WHERE e.is_active = 1 AND e.is_deleted = 0 AND a.is_available = 1";
    dbManager.getData(sql_delivery_boy)
    .then( deliveryBoys =>{
        sql_restaurant = "SELECT latitude,longitude FROM " + symbols.TABLE_RESTAURANTS +" WHERE id = " + orderData['restaurant_id'];
        dbManager.getData(sql_restaurant)
        .then( restaurantFromOrder =>{
            fetchDeliveryBoy(deliveryBoys, restaurantFromOrder[0])
                .then(deliverBoyId =>{
                    var data = {};
                    data['order_status_id'] = symbols.ORDER_STATUS_DELIVERY_BOY_ASSIGNED;
                    data['delivery_boy_id'] = deliverBoyId;
                    data['id'] = symbols.REQUEST_DATA['id'];
                    sql_update_order = "UPDATE "+symbols.TABLE_ORDERS+" set  order_status_id = '" + data['order_status_id'] + "', delivery_boy_id = '"+ data['delivery_boy_id'] +"' where id = '"+data['id']+"'";
                   dbManager.dbconnection.query(sql_update_order, function (err, result) {
                        if (err) {
                            console.log(err);
                            callback(false);
                        }
                        else{
                            callback(true);
                        }
                    });
                })
                .catch(err=>{
                    console.log(err);
                    callback(false);
                    //??? log err
                });
        })
        .catch(err=>{
            console.log(err);
            callback(false);
            //??? log error
        });
    })
    .catch(err=>{
        console.log(err);
        callback(false);
        //??? log error
    });
}

function fetchDeliveryBoy(deliveryBoys, restaurant){
    return new Promise((resolve,reject)=>{
        console.log(restaurant);
            var deliverBoyId = 0;
            var minDistance = 10000;//10km
            console.log(restaurant['longitude']);
            deliveryBoys.forEach(deliveryBoy=>{
                common.getDistanceInMeter(deliveryBoy['latitude'],deliveryBoy['longitude'],restaurant['latitude'],restaurant['longitude'],function(distanceInMeter){
                    if(minDistance > distanceInMeter){
                        minDistance = distanceInMeter;
                        deliverBoyId = deliveryBoy['id'];
                    }
                    // ???
                    // if(minDistance < 500){
                    //     break;
                    // }
                });
            });
            if(deliverBoyId != 0){
                var data = {};
                data['is_available'] = 0;
                data['employee_id'] = deliverBoyId;
                dbManager.updateData(symbols.TABLE_AVAILABILITY,data)
                    .then( success => {
                        resolve(deliverBoyId);
                    })
                    .catch(err=>{
                        reject(false);
                        //??? log error
                    });
                
            }else{
                reject(false);
            }
    });
}