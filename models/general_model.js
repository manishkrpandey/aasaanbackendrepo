const dbManager = require('../config/db_manager');
const symbols = require('../config/symbols');
const common = require('../lib/common');

module.exports.countriesRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_COUNTRIES;
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.statesRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql = "SELECT * FROM "+ symbols.TABLE_STATES;
    dbManager.getData(sql)
        .then( result => {
            callback(result);
        })
        .catch(err=>{
            callback(false);
            //??? log error
        });
}

module.exports.citiesRetrieve = function(callback) {
    data = symbols.REQUEST_DATA;
    var sql;
    if('state_id' in data){
        sql = "SELECT * FROM "+ symbols.TABLE_CITIES + " WHERE state_id = " + data['state_id'];
    }else{
        sql = "SELECT * FROM "+ symbols.TABLE_CITIES;
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
