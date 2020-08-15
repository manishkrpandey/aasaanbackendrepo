const express = require('express');
const SendOtp = require('sendotp');

const adminModel = require('../models/admin_model');
const restaurantModel = require('../models/restaurant_model');
const customerModel = require('../models/customer_model');
const symbols = require('../config/symbols');
const common = require('../lib/common');
const validation = require('../models/validation');
const msg91 = new SendOtp('339040AXFkeLO0n5f383aadP1');

const router = express.Router();

router.post(symbols.POST_LOGIN, function (req, res){

    adminModel.login(function(status,remember_token){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, '', {"remember_token":remember_token});
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Login failed');
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
                  msg91.send('9711189363','aasaan', "New Employee added successfully", function(err, response){
                    console.log(err);
                    console.log(response);
                });
                    let data = {};
                    data["id"] = insertId;
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, '', data);
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

router.get(symbols.POST_GET_OTP, function (req, res){
    msg91.send('9711189363','aasaan', "1234", function(err, response){
       if(err){
        common.sendResponse(res, 'error in get otp','get otp failed');
        return;
       }
       common.sendResponse(res, 'OTP sent successfully','OTP success');
    });
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
