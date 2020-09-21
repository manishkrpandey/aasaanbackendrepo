const express = require('express');

const restaurantModel = require('../models/restaurant_model');
const validation = require('../models/validation');
const couponController = require('./coupon_controller');
const symbols = require('../config/symbols');
const common = require('../lib/common');
const router = express.Router();


router.post(symbols.POST_CREATE, function (req, res){

    validation.isAgent(function(isAgent){
        if(isAgent){
            restaurantModel.restaurantCreate(function(rest_code){
                if(rest_code != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Added successfully!', {"rest_code":rest_code});    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Try after sometimes');    
                }
            });
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not Allowed');    
        }
    });
});

router.post(symbols.POST_LOGIN, function (req, res){
    
    common.generateOtp(function(success, otp){
        if(success){
            restaurantModel.saveOtp(otp,function(status){
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
    validation.verifyOtp(symbols.FLAG_RESTAURANT, function(status,result){
        if(status){
            let otpFromTable = result[0].otp;
            if(otpFromUser == otpFromTable){
                symbols.REQUEST_DATA['remember_token'] = "new_token";//???code to generate
                symbols.REQUEST_DATA['id'] = result[0].id;
                restaurantModel.restaurantUpdate(function(status){
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
router.get(symbols.GET_RETRIEVE, function (req, res){

    restaurantModel.restaurantRetrieve(function(restaurant){
        if(restaurant != false){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Detail', restaurant);    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
        }
    },symbols.FLAG_RESTAURANT);
});

router.get(symbols.GET_RETRIEVE_ALL, function (req, res){

    restaurantModel.restaurantRetrieveAll(function(restaurant){
        if(restaurant != false){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Detail', restaurant);    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
        }
    },symbols.FLAG_RESTAURANT);
});

router.post(symbols.POST_UPDATE, function (req, res){

    restaurantModel.restaurantUpdate(function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Update successfull!');    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'try after sometimes');    
        }
    });

});

router.post(symbols.POST_DELETE, function (req, res){

    symbols.REQUEST_DATA['is_deleted'] = true;
    restaurantModel.restaurantUpdate(function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Deleted successfull!');    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'try after sometimes');    
        }
    });

});

router.all(symbols.COMMAND_ACTIONS, function (req, res){

    switch (symbols.REQUEST_DATA['command']) {
        
        case symbols.COMMAND_RESTAURANT_TYPE_GET:
            restaurantModel.restaurantTypeRetrieve(function(restaurant_types){
                if(restaurant_types != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Restaurant types', restaurant_types);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                }
            });
            break;
        case symbols.COMMAND_RESTAURANT_MEAL_TYPE_GET:
            restaurantModel.restaurantMealTypeRetrieve(function(restaurant_meal_types){
                if(restaurant_meal_types != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Restaurant meal types', restaurant_meal_types);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
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
            },symbols.FLAG_RESTAURANT);    
            break;
        case symbols.COMMAND_RESTAURANT_MENU_SET:
                restaurantModel.setMenu(function(insertId){
                    if(insertId != false){
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Successfull!',{'id':insertId});    
                    }else{
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Failed to set');    
                    }
                });    
            break;
        case symbols.COMMAND_RESTAURANT_MENU_GET:
                restaurantModel.getMenu(function(menu){
                    if(menu != false){
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Menu',menu);    
                    }else{
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Failed to get');    
                    }
                });    
            break;
        case symbols.COMMAND_RESTAURANT_MENU_UPDATE:
                restaurantModel.updateMenu(function(status){
                    if(status){
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Menu updated');    
                    }else{
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Failed to update');    
                    }
                });    
            break;
        case symbols.COMMAND_RESTAURANT_MENU_DELETE:
                restaurantModel.deleteMenu(function(status){
                    if(status){
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Menu deleted');    
                    }else{
                        common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Failed to delete');    
                    }
                });    
            break;
        default:
            break;
        }
});
router.use(symbols.API_COUPON,couponController);
module.exports = router