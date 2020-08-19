const symbols = require('../config/symbols');
const geolib = require('geolib');
const msg91 = require("msg91")("339040AXFkeLO0n5f383aadP1", 'aasaan', 4 );

//{latitude: 52.518611, longitude: 13.408056}

module.exports.symbols = symbols;

module.exports.generateOtp = function(callback){

    var otp = Math.floor(1000 + Math.random() * 9000);

    callback(true, otp);
// ??? uncomment below block and delete above line
    // var mobileNumber = symbols.REQUEST_DATA['mobile_number'];
    // msg91.send(mobileNumber, "New Employee added successfully", function(err, response){
    //     if(err){
    //         callback(false, err);
    //     }else{
    //         callback(true, otp);
    //     }
    //  });
        
}

module.exports.decryptRequest = function(req){
    return new Promise((resolve, reject)=>{
        symbols.REQUEST_DATA = JSON.parse(JSON.stringify(req.body));
        resolve(true);
    });
}

module.exports.decryptGetRequest = function(req){
    return new Promise((resolve, reject)=>{
        symbols.REQUEST_DATA = req.query;;
        resolve(true);
    });
}

module.exports.encryptResponse = function(status , message = '', data = ''){

    return new Promise((resolve, reject)=>{
        let resJson = {};
        resJson["status"]  = status ;
        if(message != ''){
            resJson["message"] = message;
        }
        if(data != ''){
            if(Array.isArray(data)){
                resJson["data"] = data;
            }else{
                resJson["data"]  = data;
            }
        }
        let encryptedResJson = resJson;
        resolve(encryptedResJson);
    });
}

module.exports.sendResponse = function(res, status, message, data){

    module.exports.encryptResponse(status, message, data)
        .then(
            function(encryptedResJson){
                module.exports.send(res,encryptedResJson);
            },
            function(err){
                module.exports.send(res,{"status":"error","message":"Encryption error"});
            }
        );
}

module.exports.send = function(res,responseBody){
    res.statusCode = symbols.RESPONSE_STATUS_CODE;
    res.setHeader('Content-Type', symbols.RESPONSE_CONTENT_TYPE);
    res.end(JSON.stringify(responseBody, null, 4));
}

module.exports.isEmptyObject = function (obj) {
    return !Object.keys(obj).length;
}

module.exports.getDistanceInMeter = function(sourceLat, sourceLong, destinationLat, destinationLong, callback){
    return new Promise((resolve, reject)=>{
        var distanceInMeter = 0;
        var sourceObj = {latitude: sourceLat,longitude: sourceLong};
        var destinationObj = {latitude: destinationLat,longitude: destinationLong};
        distanceInMeter = geolib.getDistance(sourceObj, destinationObj);
        // await sleep(1000);
        callback(distanceInMeter);
    });
}

