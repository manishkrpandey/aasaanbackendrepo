const express = require('express');
const msg91 = require("msg91")("339040AXFkeLO0n5f383aadP1", 'aasaan', 4 );
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

router.get(symbols.POST_GET_OTP, function (req, res){
    msg91.send('9711189363', "New Employee added successfully", function(err, response){
       if(err){
        common.sendResponse(res,err,'get otp failed');
       }else{
        common.sendResponse(res, {code:'1234'},'OTP success');
       }
       
    });
});

router.get(symbols.GET_RESTAURENT_DATA, function (req, res){
    let data =  {
        restaurantName:'Maharaja Hotel',
        status:'open',
        location:{
          name:'Patna',
          longitude:'100',
          latitude:'105'
        },
        todayRevenue:{
          totalRevenue:10000,
          totalOrder:100
        },
        monthRevenue:{
          totalRevenue:10000,
          totalOrder:100
        }
      }
    common.sendResponse(data, symbols.CONSTANT_RESPONSE_SUCCESS, 'fetched');
});

router.get(symbols.GET_MENU_DATA, function (req, res){
  let data =  {
        restarentName:'',
        category:[
          {
            name:'Deserts',
            menuitems:[
                {
                  type:'1',  
                  name:'Rasgulla',
                  status:'available',
                  imageUrl:'https://i1.wp.com/www.crispyfoodidea.com/wp-content/uploads/2020/04/RASGULLA-CRISPYFOODIDEA.jpg?w=900&ssl=1',
                  variant:[{
                    name:'piece',
                    price:10
                  }]},
                  {
                    type:'1',
                  name:'Halwa',
                  status:'available',
                  imageUrl:'https://i1.wp.com/www.crispyfoodidea.com/wp-content/uploads/2020/04/RASGULLA-CRISPYFOODIDEA.jpg?w=900&ssl=1',
                  variant:[{
                    name:'100 gm',
                    price:100
                  },
                  {
                    name:'200 gm',
                    price:200
                  }
                  ]},
                  {
                    type:'1',
                  name:'Galebi',
                  status:'available',
                  imageUrl:'https://i1.wp.com/www.crispyfoodidea.com/wp-content/uploads/2020/04/RASGULLA-CRISPYFOODIDEA.jpg?w=900&ssl=1',
                  variant:[{
                    name:'100gm',
                    price:100
                  },
                  {
                    name:'1000gm',
                    price:1000
                  }
                  ]},
                  {
                    type:'1',
                  name:'Rasgulla',
                  status:'available',
                  imageUrl:'https://i1.wp.com/www.crispyfoodidea.com/wp-content/uploads/2020/04/RASGULLA-CRISPYFOODIDEA.jpg?w=900&ssl=1',
                  variant:[{
                    name:'piece',
                    price:10
                  }]}
                  
              ]
          },
              {
            name:'Dinner/lunch',
            menuitems:[{
                  type:'1',  
                  name:'Paneer',
                  status:'available',
                  imageUrl:'https://i1.wp.com/www.crispyfoodidea.com/wp-content/uploads/2020/04/RASGULLA-CRISPYFOODIDEA.jpg?w=900&ssl=1',
                  variant:[{
                    name:'1/4',
                    price:100
                  },
                  {
                    name:'1/2',
                    price:20
                  },
                  {
                    name:'Full',
                    price:40
                  }
                  ]},
                  {
                    type:'2',
                  name:'Chicken',
                  status:'available',
                  imageUrl:'https://i1.wp.com/www.crispyfoodidea.com/wp-content/uploads/2020/04/RASGULLA-CRISPYFOODIDEA.jpg?w=900&ssl=1',
                  variant:[{
                    name:'100 gm',
                    price:100
                  },
                  {
                    name:'200 gm',
                    price:200
                  }
                  ]},
                  {
                    type:'1',
                  name:'Rajma',
                  status:'available',
                  imageUrl:'https://i1.wp.com/www.crispyfoodidea.com/wp-content/uploads/2020/04/RASGULLA-CRISPYFOODIDEA.jpg?w=900&ssl=1',
                  variant:[{
                    name:'100gm',
                    price:100
                  },
                  {
                    name:'1000gm',
                    price:1000
                  }
                  ]},
                  {
                    type:'2',
                  name:'Biryani',
                  status:'available',
                  imageUrl:'https://i1.wp.com/www.crispyfoodidea.com/wp-content/uploads/2020/04/RASGULLA-CRISPYFOODIDEA.jpg?w=900&ssl=1',
                  variant:[{
                    name:'piece',
                    price:10
                  }]}
                  
              ]
          },
          
          ]
      }
      
    common.sendResponse(data, symbols.CONSTANT_RESPONSE_SUCCESS, 'fetched');
});

module.exports = router