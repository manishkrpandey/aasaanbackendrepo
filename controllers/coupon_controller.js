
const express = require('express');

const validation = require('../models/validation');
const couponModel = require('../models/coupon_model');
const symbols = require('../config/symbols');
const common = require('../lib/common');
const router = express.Router();

router.post(symbols.POST_CREATE, function (req, res){
    couponModel.couponCreate(function(id){
        if(id){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Coupon created',{id:id});    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Failed to create');    
        }
    });
});

router.post(symbols.GET_RETRIEVE, function (req, res){
    couponModel.couponRetrieve(function(result){
        if(result){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Retrieved',result);    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Failed to retrieve');
        }
    });
});

router.post(symbols.POST_UPDATE, function (req, res){
    couponModel.couponUpdate(function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Coupon updated successfully');    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Failed to update');
        }
    });
});

router.post(symbols.POST_DELETE, function (req, res){
    couponModel.couponDelete(function(status){
        if(status){
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_SUCCESS, 'Coupon deleted');    
        }else{
            common.sendResponse(res, symbols.CONSTANT_RESPONSE_ERROR, 'Failed to delete');
        }
    });
});

module.exports = router