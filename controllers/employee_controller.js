const express = require('express');

const employeeModel = require('../models/employee_model');
const restaurantModel = require('../models/restaurant_model');
const validation = require('../models/validation');
const symbols = require('../config/symbols');
const common = require('../lib/common');
const log = require('simple-node-logger').createSimpleLogger('project.log');
const router = express.Router();

router.post(symbols.POST_IS_REGISTERED, function (req, res){
log.isInfo(req);
    validation.isRegisteredEmplyee(function(status){
        if(status){
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
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not resgistered,' + otp);   
                }
            });
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not resgistered');    
        }
    });
});

router.post(symbols.POST_VERIFY_OTP, function (req, res){

    var otpFromUser = symbols.REQUEST_DATA['otp'];
    validation.verifyOtp(symbols.FLAG_AGENT,function(status,result){
        if(status){
            let otpFromTable = result[0].otp;
            if(otpFromUser == otpFromTable){
                common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'verification done');    
            }else{
                common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Verification failed');        
            }
            
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not resgistered');    
        }
    });
});

router.post(symbols.POST_CREATE, function (req, res){

    validation.isRegisteredEmployee(function(status){
        if(status){
            employeeModel.employeeCreate(function(insertId){
                if(insertId > 0){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Signup successfull!', {"id":insertId});    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Already registered or try after sometimes');    
                }
            });
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not resgistered');    
        }
    });
});

router.post(symbols.POST_LOGIN, function (req, res){

    employeeModel.login(function(status,remember_token){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, '', {"remember_token":remember_token});    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Login failed');    
        }
    });
});

router.get(symbols.GET_RETRIEVE, function (req, res){

    employeeModel.employeeRetrieve(function(employee){
        if(employee != false){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Detail', employee);    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
        }
    });
    
});

router.post(symbols.POST_UPDATE, function (req, res){

    employeeModel.employeeUpdate(function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Update successfull!');    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'try after sometimes');    
        }
    });

});

router.post(symbols.COMMAND_ACTIONS, function (req, res){

    switch (symbols.REQUEST_DATA['command']) {
        case symbols.COMMAND_ADDRESS_SET:
            employeeModel.employeeAddressCreate(function(insertId){
                if(insertId > 0){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Address inserted!', {"id":insertId});    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Already exist or try after sometimes');    
                }
            });    
            break;
        case symbols.COMMAND_ADDRESS_UPDATE:
            employeeModel.employeeAddressUpdate(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Address updated successfully');    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Address Update failed');    
                }
            });      
            break;
        case symbols.COMMAND_ADDRESS_DELETE:
            employeeModel.employeeAddressDelete(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Address deleted');    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Address deletion failed');    
                }
            });          
            break;
        case symbols.COMMAND_GET_RESTAURANTS:
            validation.isAgent(function(isAgent){
                if(isAgent){
                    restaurantModel.restaurantRetrieve(function(restaurant){
                        if(restaurant != false){
                            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Detail', restaurant);    
                        }else{
                            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                        }
                    },symbols.FLAG_AGENT);  
                }else{
                    //check for delivery boy
                    validation.isDeliveryBoy(function(isDeliveryBoy){
                        if(isDeliveryBoy){
                            restaurantModel.restaurantRetrieve(function(restaurant){
                                if(restaurant != false){
                                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Detail', restaurant);    
                                }else{
                                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                                }
                            },symbols.FLAG_DELIVERY_BOY);  
                        }else{
                            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not allowed');  
                        }
                    });
                }
            });
                    
            break; 
        case symbols.COMMAND_RESTAURANT_VERIFY:
                restaurantModel.verifyRestaurant(function(status){
                    if(status){
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Verified!');    
                    }else{
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not verified');    
                    }
                },symbols.FLAG_AGENT);
            break;
        case symbols.COMMAND_AVAILABILITY_UPDATE:
            employeeModel.availabilityUpdate(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Availability update successfully');    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Address Update failed');    
                }
            });
            break;      
        case symbols.COMMAND_TRACK_UPDATE:
            employeeModel.trackUpdate(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Track update successfully');    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Track Update failed');    
                }
            });
            break;      
        default:
            break;
    }
    // common.sendResponse(res, symbols.C ONSTANT_RESPONSE_ERROR, 'testing');    
});

router.get(symbols.COMMAND_ACTIONS, function (req, res){

    switch (symbols.REQUEST_DATA['command']) {
        
        case symbols.COMMAND_ADDRESS_GET:
            employeeModel.employeeAddressRetrieve(function(addresses){
                if(addresses != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Address', addresses);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Address not found');    
                }
            });
            break;
        case symbols.COMMAND_EMPLOYEE_TYPE_GET:
            employeeModel.employeeTypeRetrieve(function(employee_types){
                if(employee_types != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Employee Types', employee_types);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                }
            });
            break;   
        case symbols.COMMAND_EMPLOYEE_JOB_TYPE_GET:
            employeeModel.employeeJobTypeRetrieve(function(employee_job_types){
                if(employee_job_types != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Employee Job Types', employee_job_types);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                }
            });
            break;  
        case symbols.COMMAND_EMPLOYEE_SLOT_GET:
            employeeModel.employeeSlotRetrieve(function(employee_slot){
                if(employee_slot != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Employee Slot', employee_slot);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                }
            });
            break;  
        case symbols.COMMAND_DOCUMENT_TYPE_GET:
            employeeModel.documentTypeRetrieve(function(documentTypes){
                if(documentTypes != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Employee Document Types', documentTypes);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                }
            });
            break;
        case symbols.COMMAND_DELIVERY_BOY_GET:
                employeeModel.documentTypeRetrieve(function(documentTypes){
                    if(documentTypes != false){
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Employee Document Types', documentTypes);    
                    }else{
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                    }
                });
                break;
        default:
            break;
        }
});

router.all(symbols.POST_DOCUMENT, function (req, res){

    switch (symbols.REQUEST_DATA['command']) {
        case symbols.COMMAND_INSERT:
            employeeModel.employeeDocumentCreate(function(insertId){
                if(insertId > 0){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'document inserted!', {"id":insertId});    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Already exist or try after sometimes');    
                }
            });
            break;
        case symbols.COMMAND_RETRIEVE:
            employeeModel.employeeDocumentRetrieve(function(documents){
                if(documents != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'document', documents);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'document not found');    
                }
            });  
        break;
        case symbols.COMMAND_UPDATE:
            employeeModel.employeeDocumentUpdate(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'document updated successfully');    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'document Update failed');    
                }
            });  
            break;
        case symbols.COMMAND_DELETE:
            employeeModel.employeeDocumentDelete(function(status){
                if(status){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'document deleted');    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'document deletion failed');    
                }
            });          
            break;
          
        default:
            break;
    }
});



module.exports = router