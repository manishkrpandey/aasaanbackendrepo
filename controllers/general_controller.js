const express = require('express');

const generalModel = require('../models/general_model');
const validation = require('../models/validation');
const restaurantModel = require('../models/restaurant_model');
const symbols = require('../config/symbols');
const common = require('../lib/common');
const router = express.Router();


router.get(symbols.COMMAND_ACTIONS, function (req, res){

    switch (symbols.REQUEST_DATA['command']) {
        case symbols.COMMAND_STATES_GET:
            generalModel.statesRetrieve(function(states){
                if(states != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'States ', states);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                }
            });
            break;
        case symbols.COMMAND_CITY_GET:
            generalModel.citiesRetrieve(function(cities){
                if(cities != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'cities ', cities);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                }
            });
            break;
        case symbols.COMMAND_COUNTRY_GET:
            generalModel.countriesRetrieve(function(countries){
                if(countries != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'countries ', countries);    
                }else{
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Not found');    
                }
            });
            break;
        case symbols.COMMAND_SEARCH_ITEMS:
            restaurantModel.searchItems(function(data){
                if(data != false){
                    common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Search result', data);    
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