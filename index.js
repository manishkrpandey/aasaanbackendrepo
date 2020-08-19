const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const common = require('./lib/common');
const symbols = require('./config/symbols');
const employeeController = require('./controllers/employee_controller');
const generalController = require('./controllers/general_controller');
const adminController = require('./controllers/admin_controller');
const restaurantController = require('./controllers/restaurant_controller');
const customerController = require('./controllers/customer_controller');

const app = express();
app.use(cors())
const host = '0.0.0.0';
const httpPort = 9000;

const server = app.listen(httpPort, host, function () {
  const host = server.address().address;
  const port = server.address().port;
  
  console.log('Web server running at http://%s:%s', host, httpPort );
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
  console.log('verifying....');
  next();
});

app.post('*', function(req, res, next){
  common.decryptRequest(req)
  .then(
    function(success){
      next();
    },
    function(err){
      common.sendResponse(res,{"status":"error","message":"Something went wrong"});
    }
    );
});

app.get('*', function(req, res, next){
  common.decryptGetRequest(req)
  .then(
    function(success){
      next();
    },
    function(err){
      common.sendResponse(res,{"status":"error","message":"Something went wrong"});
    }
    );
});
app.use(symbols.API_EMPLOYEE,employeeController);
app.use(symbols.API_GENERAL,generalController);
app.use(symbols.API_ADMIN,adminController);
app.use(symbols.API_RESTAURANT,restaurantController);
app.use(symbols.API_CUSTOMER,customerController);
app.get(symbols.GET_API_ALL, function (req, res) {
  common.send(res,symbols.JSON_COMMANDS);
});

app.get(symbols.GET_RESTAURENT_DATA, function (req, res){
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

app.get(symbols.GET_MENU_DATA, function (req, res){
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
