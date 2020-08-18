const express = require('express');

const customerModel = require('../models/customer_model');
const restaurantModel = require('../models/restaurant_model');
const validation = require('../models/validation');
const symbols = require('../config/symbols');
const common = require('../lib/common');
const router = express.Router();

router.post(symbols.POST_REGISTER, function (req, res){

    validation.isCustomerExist(function(status,result){

        if(status){
            var data = {};
            data['is_verified'] = false;
            data['id'] = result[0].id;
            customerModel.customerUpdate(data,function(status){
                if(status){
                    common.generateOtp(function(success, otp){
                        if(success)
                        {
                            customerModel.saveOtp(otp,function(status){
                                if(status){
                                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Check otp',{"otp":otp});
                                }else{
                                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Try again');
                                }
                            });
                        }
                        else
                        {
                            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Registratin failed, ' + otp);
                        }
                    });
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Registratin failed');
                }
            });

        }else{
            customerModel.registerCustomer(function(status){
                if(status){
                    common.generateOtp(function(success, otp){
                        if(success)
                        {
                            customerModel.saveOtp(otp,function(status){
                                if(status){
                                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Check otp',{"otp":otp});    
                                }else{
                                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Try again');                
                                }
                            });
                        }
                        else
                        {
                            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Registratin failed, ' + otp);
                        }
                    });
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Registratin failed');
                }
            });
        }
    });
    
});

router.post(symbols.POST_VERIFY_OTP, function (req, res){

    var otpFromUser = symbols.REQUEST_DATA['otp'];
    validation.verifyOtp(symbols.FLAG_CUSTOMER, function(status,result){
        if(status){
            let otpFromTable = result[0].otp;
            if(otpFromUser == otpFromTable){
                var data = {};
                data['is_verified'] = true;
                data['id'] = result[0].id;
                customerModel.customerUpdate(data,function(status){
                    if(status){
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'verification done',{'id':result[0].id});    
                    }else{
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Verification failed');        
                    }
                });
            }else{
                common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'OTP does not matched');        
            }
            
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not resgistered');    
        }
    });
});

router.post(symbols.POST_CREATE, function (req, res){

    validation.isVerifiedCustomer(function(status){
        if(status){
            customerModel.customerCreate(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Signup successfull!');    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Try after sometimes');    
                }
            });
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not verified');    
        }
    });
});

router.post(symbols.POST_LOGIN, function (req, res){

    customerModel.login(function(status,remember_token){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, '', {"remember_token":remember_token});    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Login failed');    
        }
    });
});

router.get(symbols.GET_RETRIEVE, function (req, res){

    customerModel.customerRetrieve(symbols.FLAG_CUSTOMER, function(customer){
        if(customer != false){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Detail', customer);    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
        }
    });
    
});

router.post(symbols.POST_UPDATE, function (req, res){

    customerModel.customerUpdate({},function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Update successfull!');    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'try after sometimes');    
        }
    });

});

router.post(symbols.POST_DELETE, function (req, res){

    var data = {};
    data['is_deleted'] = true;
    data['id'] = symbols.REQUEST_DATA['id'];

    customerModel.customerUpdate(data,function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Update successfull!');    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'try after sometimes');    
        }
    });

});

router.all(symbols.COMMAND_ACTIONS, function (req, res){

    switch (symbols.REQUEST_DATA['command']) {
        case symbols.COMMAND_ADDRESS_GET:
            customerModel.customerAddressRetrieve(function(addresses){
                if(addresses != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Address', addresses);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Address not found');    
                }
            });
            break;
        case symbols.COMMAND_ADDRESS_SET:
                customerModel.customerAddressCreate(function(insertId){
                    if(insertId > 0){
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Address inserted!', {"id":insertId});    
                    }else{
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Already exist or try after sometimes');    
                    }
                });    
            break;
        case symbols.COMMAND_ADDRESS_UPDATE:
            customerModel.customerAddressUpdate(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Address updated successfully');    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Address Update failed');    
                }
            });      
            break;
        case symbols.COMMAND_ADDRESS_DELETE:
            customerModel.customerAddressDelete(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Address deleted');    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Address deletion failed');    
                }
            });          
            break;
        default:
            break;
        }
});


module.exports = router