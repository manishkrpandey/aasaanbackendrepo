const express = require('express');
const bodyParser = require('body-parser'); 

const common = require('./lib/common');
const symbols = require('./config/symbols');
const employeeController = require('./controllers/employee_controller');
const generalController = require('./controllers/general_controller');
const adminController = require('./controllers/admin_controller');
const restaurantController = require('./controllers/restaurant_controller');
const customerController = require('./controllers/customer_controller');

const app = express();
const host = '0.0.0.0';
const httpPort = 9000;

const server = app.listen(httpPort, host, function () {
  const host = server.address().address;
  const port = server.address().port;
  
  console.log('Web server running at http://%s:%s', host, httpPort );
});

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.all('*', function (req, res, next) {
//   console.log('verifying....');
//   next();
// });

// app.post('*', function(req, res, next){
//   common.decryptRequest(req)
//   .then(
//     function(success){
//       next();
//     },
//     function(err){
//       common.sendResponse(res,{"status":"error","message":"Something went wrong"});
//     }
//     );
// });

// app.get('*', function(req, res, next){
//   common.decryptGetRequest(req)
//   .then(
//     function(success){
//       next();
//     },
//     function(err){
//       common.sendResponse(res,{"status":"error","message":"Something went wrong"});
//     }
//     );
// });
// app.use(symbols.API_EMPLOYEE,employeeController);
// app.use(symbols.API_GENERAL,generalController);
// app.use(symbols.API_ADMIN,adminController);
// app.use(symbols.API_RESTAURANT,restaurantController);
// app.use(symbols.API_CUSTOMER,customerController);
// app.get(symbols.GET_API_ALL, function (req, res) {
//   common.send(res,symbols.JSON_COMMANDS);
// });