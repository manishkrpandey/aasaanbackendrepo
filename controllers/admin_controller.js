const express = require('express');

const adminModel = require('../models/admin_model');
const restaurantModel = require('../models/restaurant_model');
const customerModel = require('../models/customer_model');
const employeeModel = require('../models/employee_model');
const symbols = require('../config/symbols');
const common = require('../lib/common');
const validation = require('../models/validation');
const msg91 = require("msg91")("314351AuGVGmoEJ5e27efceP1", 611332, 1 );

const router = express.Router();

router.post(symbols.POST_LOGIN, function (req, res){
    common.generateOtp(function(success, otp){
        if(success){
            adminModel.saveOtp(otp,function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Check otp',{"otp":otp});    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Try again');                
                }
            });

        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'OTP generation failed');                
        }
    });
   
});


router.post(symbols.POST_VERIFY_OTP, function (req, res){

    var otpFromUser = symbols.REQUEST_DATA['otp'];
    validation.verifyOtp(symbols.FLAG_ADMIN, function(status,result){
        if(status){
            let otpFromTable = result[0].otp;
            if(otpFromUser == otpFromTable){
                symbols.REQUEST_DATA['remember_token'] = "new_token";//???code to generate
                symbols.REQUEST_DATA['id'] = result[0].id;
                symbols.REQUEST_DATA['otp'] = 0;
                console.log( symbols.REQUEST_DATA);
                adminModel.adminUpdate(function(status){
                    if(status){
                        result['remember_token'] = symbols.REQUEST_DATA['remember_token'];
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'verification done',result);    
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

router.all("*", function(req, res, next){
    validation.isAdmin(function(isAdmin){
        if(isAdmin){
            next();
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not Allowed');
        }
    });

});
router.post(symbols.POST_REGISTER_EMPLOYEE, function (req, res){
    switch (symbols.REQUEST_DATA['command']) {
        case symbols.COMMAND_INSERT:
            adminModel.employeeRegister(function(insertId){
                if(insertId > 0){
                    common.generateOtp(function(success, otp){
                        if(success)
                        {
                            employeeModel.saveOtp(otp,function(status){
                                if(status){
                                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Check otp',{"otp":otp});
                                }else{
                                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Try again');
                                }
                            });
                        }
                        else
                        {
                            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Registratin failed, OTP not generated ');
                        }
                    });
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Registration failed');
                }
            });
            break;
        case symbols.COMMAND_UPDATE:
            adminModel.updateEmployeeRegister(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Updated successfully');
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Update failed');
                }
            });
            break;
        case symbols.COMMAND_RETRIEVE:
                console.log("pp");
            adminModel.retrieveEmployeeRegister(function(status, employees){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS,'',employees);
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Retrieve failed');
                }
            });
            break;
        case symbols.COMMAND_DELETE:
            adminModel.deleteEmployeeRegister(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Deleted successfully');
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Delete failed');
                }
            });
            break;

        default:
            break;
    }
});

router.post(symbols.COMMAND_ACTIONS, function (req, res){

    switch (symbols.REQUEST_DATA['command']) {
        case symbols.COMMAND_GET_RESTAURANTS:
            restaurantModel.restaurantRetrieve(function(restaurant){
                if(restaurant != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Detail', restaurant);
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');
                }
            },symbols.FLAG_ADMIN);
            break;

        case symbols.COMMAND_RESTAURANT_VERIFY:
            restaurantModel.verifyRestaurant(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Verified!');
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not verified');
                }
            },symbols.FLAG_ADMIN);
            break;

        case symbols.COMMAND_CUSTOMER_GET:
            customerModel.customerRetrieve(symbols.FLAG_ADMIN, function(customers){
                if(customers != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Detail', customers);
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');
                }
            });
            break;

        default:
            break;
    }
});

module.exports = router
