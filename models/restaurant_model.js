const dbManager = require('../config/db_manager');
const symbols = require('../config/symbols');
const common = require('../lib/common');

module.exports.restaurantCreate = function(callback) {

    //??? generate below
    var rest_code = "AASAANEATS"+ symbols.REQUEST_DATA['mobile_number'];
    symbols.REQUEST_DATA['rest_code'] = rest_code;
    dbManager.insertData(symbols.TABLE_RESTAURANTS)
        .then( insertId => {
            if(insertId > 0){
                callback(rest_code);
            }else{
                callback(false);
            }
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.verifyRestaurant = function(callback,accessFlag) {
    data = symbols.REQUEST_DATA;

    if(accessFlag == symbols.FLAG_RESTAURANT){
        var sql = "select * from " + symbols.TABLE_RESTAURANTS + " where mobile_number = '" + data['mobile_number'] + "' and "+
                " rest_code = '" + data['rest_code'] +"'";
        dbManager.getData(sql)
            .then( result => {
                if(result && result[0].id != false){
                    var updateData = {};
                    updateData['rest_code'] = data['rest_code'];
                    updateData['password'] = data['password'];
                    dbManager.updateData(symbols.TABLE_RESTAURANTS, updateData)
                        .then( success => {
                            callback(true);
                        })
                        .catch(err=>{
                            console.log(err);
                            callback(false);
                            //??? log error
                        });
                }else{
                    callback(false);
                }
            })
            .catch(err=>{
                callback(false);
                //??? log error
            });
    } else if(accessFlag == symbols.FLAG_AGENT){
        var updateData = {};
        updateData['is_agent_verified'] = true;
        updateData['id'] = data['id'];
        dbManager.updateData(symbols.TABLE_RESTAURANTS, updateData)
            .then( success => {
                callback(true);
            })
            .catch(err=>{
                console.log(err);
                callback(false);
                //??? log error
            });

    } else if(accessFlag == symbols.FLAG_ADMIN){
        var updateData = {};
        updateData['is_admin_verified'] = true;
        updateData['id'] = data['id'];
        dbManager.updateData(symbols.TABLE_RESTAURANTS, updateData)
            .then( success => {
                callback(true);
            })
            .catch(err=>{
                console.log(err);
                callback(false);
                //??? log error
            });
    } else{
        callback(false);
        //log
    }
    
}

module.exports.login = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "select * from " + symbols.TABLE_RESTAURANTS + " where mobile_number = '" + data['mobile_number'] + "' and "+
                " password = '" + data['password'] +"'";
    dbManager.getData(sql)
        .then( result => {
            var remember_token = "new_token";//code to generate
            dbManager.updateData(symbols.TABLE_EMPLOYEES, {"remember_token":remember_token,"id":result[0].id})
                .then( success => {
                    callback(true,remember_token);
                })
                .catch(err=>{
                    console.log(err);
                    callback(false);
                    //??? log error
                });
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.restaurantRetrieve = function(callback,accessFlag = null) {

    var data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+symbols.TABLE_RESTAURANTS;//write accroding to login
    var where = " where 1 ";
    if(data['id'] && data['id'] > 0){
        where += " AND id = " + data['id'] + " AND is_deleted = false";
    }else if(accessFlag == symbols.FLAG_AGENT){
        if(data['agent_id'] && data['agent_id'] > 0){
            where += " AND agent_id = '" + data['agent_id'] +"'";
        }else{
            where += " AND false";
        }

    }else if(accessFlag == symbols.FLAG_DELIVERY_BOY){

    }else if(accessFlag == symbols.FLAG_ADMIN){
     
    }else{
        where += " AND false";
    }
    sql += where;
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}


module.exports.restaurantUpdate = function(callback) 
{
    dbManager.updateData(symbols.TABLE_RESTAURANTS, symbols.REQUEST_DATA)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.restaurantDelete = function(callback) {
    dbManager.deleteData(symbols.TABLE_RESTAURANTS, symbols.REQUEST_DATA['id'])
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            console.log(err);
            callback(false);
            //??? log error
        });
}

module.exports.setMenu = function(callback) {

    dbManager.insertData(symbols.TABLE_RESTAURANT_MENU)
        .then( insertId => {
            callback(insertId);
        })
        .catch(err=>{
            callback(0);
            //??? log error
        });
}

module.exports.getMenu = function(callback) {
    
    data = symbols.REQUEST_DATA;
    var sql = "";
    if(data['id'] && data['id'] > 0){

        sql = "SELECT * FROM "+ symbols.TABLE_RESTAURANT_MENU+" WHERE id = '"+ data['id']+"'";
    }else if(data['restaurant_id'] && data['restaurant_id'] > 0){
        sql = "SELECT * FROM "+ symbols.TABLE_RESTAURANT_MENU+" WHERE restaurant_id = '"+ data['restaurant_id']+"'";

    }
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.updateMenu = function(callback) {

    dbManager.updateData(symbols.TABLE_RESTAURANT_MENU, symbols.REQUEST_DATA)
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.deleteMenu = function(callback) {

    dbManager.deleteData(symbols.TABLE_RESTAURANT_MENU, symbols.REQUEST_DATA['id'])
        .then( success => {
            callback(true);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.restaurantTypeRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT id,title FROM "+ symbols.TABLE_RESTAURANT_TYPES;
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.restaurantMealTypeRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT id,title FROM "+ symbols.TABLE_RESTAURANT_TYPES;
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.searchItems = function(callback) {
    data = symbols.REQUEST_DATA;
    var searchData = {};
    var exactMatchCondition = " 1 ";
    var aproxMatchCondition = " 1 ";
    var tags = data['menu_tags'].split(" ");
    tags.forEach(element => {
        exactMatchCondition += " AND menu_tags LIKE '%" + element + "%' "; 
        aproxMatchCondition += " OR menu_tags LIKE '%" + element + "%' "; 
    });
    var sql = "SELECT r.*, rm.menu_items FROM restaurants r INNER JOIN restaurant_menu rm ON r.id = rm.restaurant_id ";

    dbManager.getData(sql+" WHERE " + exactMatchCondition)
        .then( result => {
            filterRestaurants(result)
                .then(filteredDataOfExactMatch=>{
                    if(filteredDataOfExactMatch['status']){
                        searchData['exact'] = filteredDataOfExactMatch['filterRestaurants'];
                        dbManager.getData(sql+" WHERE " + aproxMatchCondition)
                        .then( result => {
                            filterRestaurants(result)
                                .then(filteredDataOfAproxMatch=>{
                                    if(filteredDataOfAproxMatch['status']){
                                        searchData['aprox'] = filteredDataOfAproxMatch['filterRestaurants'];
                                        callback(searchData);
                                    }
                                })
                                .catch(err=>{
                                    //log err
                                    //here if we set result then we may show reest but not available
                                    callback(searchData);
                                })
                        })
                        .catch(err=>{
                            //log
                            callback(searchData);
                        });
                    }
                })
                .catch(err=>{
                    //log err
                    //here if we set result then we may show reest but not available
                    callback(searchData);
                })
        })
        .catch(err=>{
            //log
            console.log(err);
            callback(searchData);
        });
}

function filterRestaurants(restaurants){
    return new Promise((resolve,reject)=>{
        var responseRestaurants = [];
        if(symbols.REQUEST_DATA['isLocationCheckOn'] == "on"){
            let count = 1;
            let length = restaurants.length;
            restaurants.forEach(restaurant=>{
                common.getDistanceInMeter(restaurant['latitude'],restaurant['longitude'],symbols.REQUEST_DATA['latitude'],symbols.REQUEST_DATA['longitude'],function(distanceInMeter){
                    let distanceInKm = distanceInMeter/1000;
                    if(restaurant['radius_covered_in_km'] >= distanceInKm){
                        restaurant['distance_in_km'] = distanceInKm;
                        responseRestaurants.push(restaurant);
                    }
                    count++;
                })
            });
            if(count >= length){
                var filteredData = {};
                filteredData['status'] = true;
                filteredData['filterRestaurants'] = responseRestaurants;
                
                resolve(filteredData);
            }
        }else{
            var filteredData = {};
            filteredData['status'] = true;
            filteredData['filterRestaurants'] = restaurants;
            resolve(filteredData);
    }    
    });
}