const mysql = require('mysql');
const symbols = require('./symbols');


const dbconnection = mysql.createConnection({
    host: "localhost",
    user: "bandagv7_maneesh",
    database: 'bandagv7_online_food',
    password: "[-0yreu(=_F1",
    supportBigNumbers: true,
    bigNumberStrings: true
});

/*
const dbconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: 'online_food',
    password: "",
    supportBigNumbers: true,
    bigNumberStrings: true
});


const dbconnection = mysql.createConnection({
    host: "localhost",
    user: "bandagv7_maneesh",
    database: 'bandagv7_online_food',
    password: "[-0yreu(=_F1",
    supportBigNumbers: true,
    bigNumberStrings: true
});
*/

dbconnection.connect(function(err) {
    if (err) {
        throw err;
    }
    
    console.log("Connected to DB !");

    const tableArr = [
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_DOCUMENT_TYPES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR (30) NOT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_TYPES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR (30) NOT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_JOB_TYPES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR (30) NOT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_SLOTS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR (30) NOT NULL, start_time VARCHAR(30) NOT NULL, end_time VARCHAR(30) NOT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_REGISTER  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, mobile_number VARCHAR (20) NOT NULL UNIQUE, employee_type_id BIGINT(20) UNSIGNED NOT NULL, employee_name VARCHAR (255) NOT NULL, email_id VARCHAR (255) NOT NULL, is_signed_up BOOLEAN DEFAULT FALSE,metadata VARCHAR (255) DEFAULT NULL, otp varchar(10) default 0, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,FOREIGN KEY (employee_type_id)  REFERENCES  " + symbols.TABLE_EMPLOYEE_TYPES + " (id), PRIMARY KEY (id) );",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, country_code VARCHAR (10) DEFAULT 91, mobile_number VARCHAR (20) NOT NULL UNIQUE, alternate_mobile_number VARCHAR (20) DEFAULT NULL, email_id VARCHAR (255) DEFAULT NULL, first_name VARCHAR (255) DEFAULT NULL, middle_name VARCHAR (255) DEFAULT NULL, last_name VARCHAR (255) DEFAULT NULL, father_name VARCHAR (255) DEFAULT NULL, password VARCHAR (255) NOT NULL, profile_picture VARCHAR (255) DEFAULT NULL, is_active BOOLEAN DEFAULT TRUE, is_deleted BOOLEAN DEFAULT FALSE, is_profile_completed BOOLEAN DEFAULT FALSE, employee_type_id BIGINT UNSIGNED NOT NULL, employee_job_type_id BIGINT UNSIGNED NOT NULL, employee_slot_id BIGINT UNSIGNED NOT NULL, metadata VARCHAR (255) DEFAULT NULL, remember_token VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (employee_type_id)  REFERENCES employee_types(id), FOREIGN KEY (mobile_number)  REFERENCES employee_register(mobile_number), FOREIGN KEY (employee_job_type_id)  REFERENCES  " + symbols.TABLE_EMPLOYEE_JOB_TYPES + " (id), FOREIGN KEY (employee_slot_id)  REFERENCES  " + symbols.TABLE_EMPLOYEE_SLOTS + " (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_PINS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, employee_id BIGINT UNSIGNED NOT NULL UNIQUE, pins_covered TEXT DEFAULT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (employee_id)  REFERENCES  " + symbols.TABLE_EMPLOYEES + " (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_TRACK  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, employee_id BIGINT UNSIGNED NOT NULL, latitude VARCHAR(30) DEFAULT NULL, longitude VARCHAR(30) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (employee_id)  REFERENCES " + symbols.TABLE_EMPLOYEES +" (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_RATINGS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, employee_id BIGINT UNSIGNED NOT NULL UNIQUE, one_star INTEGER DEFAULT 0, two_star INTEGER DEFAULT 0, three_star INTEGER DEFAULT 0, four_star INTEGER DEFAULT 0, five_star INTEGER DEFAULT 0, average_rating DECIMAL(18,2) DEFAULT 0.0, comments TEXT DEFAULT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (employee_id)  REFERENCES "+ symbols.TABLE_EMPLOYEES+" (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_DOCUMENTS + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, employee_id BIGINT UNSIGNED NOT NULL UNIQUE, document_type_id BIGINT UNSIGNED NOT NULL, document_number VARCHAR(255) NOT NULL, details VARCHAR(255) DEFAULT NULL, is_verified BOOLEAN DEFAULT FALSE, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (employee_id)  REFERENCES " + symbols.TABLE_EMPLOYEES + " (id), FOREIGN KEY (document_type_id) REFERENCES  " + symbols.TABLE_DOCUMENT_TYPES + " (id) ) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_BLACK_LISTS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, employee_id BIGINT UNSIGNED NOT NULL UNIQUE, reason VARCHAR(255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (employee_id)  REFERENCES  " + symbols.TABLE_EMPLOYEES + " (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_COUNTRIES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR(100) NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id) ) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_STATES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR(100) NOT NULL, country_id BIGINT UNSIGNED NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (country_id)  REFERENCES  " + symbols.TABLE_COUNTRIES + " (id) ) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_CITIES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR(100) NOT NULL, state_id BIGINT UNSIGNED NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (state_id)  REFERENCES  " + symbols.TABLE_STATES + " (id) ) ; ",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_EMPLOYEE_ADDRESS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, employee_id BIGINT UNSIGNED NOT NULL UNIQUE, address TEXT DEFAULT NULL, country_id BIGINT UNSIGNED NOT NULL, state_id BIGINT UNSIGNED NOT NULL, city_id BIGINT UNSIGNED NOT NULL, pin VARCHAR(10) NOT NULL, land_mark VARCHAR(255) DEFAULT NULL, latitude VARCHAR(255) DEFAULT NULL, longitude VARCHAR(255) DEFAULT NULL, is_verified BOOLEAN DEFAULT FALSE, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (employee_id)  REFERENCES  " + symbols.TABLE_EMPLOYEES + " (id), FOREIGN KEY (country_id)  REFERENCES  "+ symbols.TABLE_COUNTRIES+" (id), FOREIGN KEY (state_id)  REFERENCES "+ symbols.TABLE_STATES +" (id), FOREIGN KEY (city_id)  REFERENCES  "+ symbols.TABLE_CITIES +" (id) ) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_ADMIN  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,user_name VARCHAR (255) NOT NULL UNIQUE,password VARCHAR (255) NOT NULL, mobile_number VARCHAR (20) NOT NULL UNIQUE, remember_token VARCHAR (20) DEFAULT NULL, role VARCHAR (20) NOT NULL DEFAULT 0,  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_RESTAURANT_TYPES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR (30) NOT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_RESTAURANT_MEAL_TYPES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR (30) NOT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ;", 
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_RESTAURANTS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, rest_code VARCHAR (255) DEFAULT NULL UNIQUE, contact_person VARCHAR (255) DEFAULT NULL, country_code VARCHAR (10) DEFAULT 91, mobile_number VARCHAR (20) NOT NULL UNIQUE, alternate_mobile_number VARCHAR (20) DEFAULT NULL, email_id VARCHAR (255) DEFAULT NULL, restaurant_name VARCHAR (255) DEFAULT NULL, opening_time VARCHAR (50) DEFAULT NULL, closing_time VARCHAR (50) DEFAULT NULL, delivery_end_time VARCHAR (50) DEFAULT NULL, is_delivery_boy_required BOOLEAN DEFAULT FALSE, password VARCHAR (255) NOT NULL, restaurant_pictures TEXT DEFAULT NULL, is_active BOOLEAN DEFAULT TRUE, is_deleted BOOLEAN DEFAULT FALSE, is_agent_verified BOOLEAN DEFAULT FALSE, is_admin_verified BOOLEAN DEFAULT FALSE, restaurant_type_id BIGINT UNSIGNED NOT NULL,restaurant_meal_type_id BIGINT UNSIGNED NOT NULL, address TEXT DEFAULT NULL, country_id BIGINT UNSIGNED NOT NULL, state_id BIGINT UNSIGNED NOT NULL, city_id BIGINT UNSIGNED NOT NULL, pin VARCHAR(10) NOT NULL, land_mark VARCHAR(255) DEFAULT NULL, latitude VARCHAR(255) DEFAULT NULL, longitude VARCHAR(255) DEFAULT NULL, metadata VARCHAR (255) DEFAULT NULL, remember_token VARCHAR (255) DEFAULT NULL, agent_id BIGINT UNSIGNED NOT NULL, radius_covered_in_km INT UNSIGNED default 0, otp varchar(10) default 0, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (restaurant_type_id)  REFERENCES "+ symbols.TABLE_RESTAURANT_TYPES  + "(id), FOREIGN KEY (restaurant_meal_type_id)  REFERENCES "+ symbols.TABLE_RESTAURANT_MEAL_TYPES  + "(id), FOREIGN KEY (agent_id)  REFERENCES "+ symbols.TABLE_EMPLOYEES  + "(id));",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_RESTAURANT_PINS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, restaurant_id BIGINT UNSIGNED NOT NULL UNIQUE, pins_covered TEXT DEFAULT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (restaurant_id)  REFERENCES  " + symbols.TABLE_RESTAURANTS + " (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_RESTAURANT_MENU  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, restaurant_id BIGINT UNSIGNED NOT NULL UNIQUE, menu_items TEXT DEFAULT NULL, menu_tags TEXT DEFAULT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (restaurant_id)  REFERENCES  " + symbols.TABLE_RESTAURANTS + " (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_AVAILABILITY  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, employee_id BIGINT UNSIGNED NOT NULL UNIQUE,  is_available BOOLEAN DEFAULT FALSE, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (employee_id)  REFERENCES  " + symbols.TABLE_EMPLOYEES + " (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_CUSTOMERS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, country_code VARCHAR (10) DEFAULT 91, mobile_number VARCHAR (20) NOT NULL UNIQUE, alternate_mobile_number VARCHAR (20) DEFAULT NULL, email_id VARCHAR (255) DEFAULT NULL, first_name VARCHAR (255) DEFAULT NULL, middle_name VARCHAR (255) DEFAULT NULL, last_name VARCHAR (255) DEFAULT NULL, password VARCHAR (255) NOT NULL, profile_picture VARCHAR (255) DEFAULT NULL, is_active BOOLEAN DEFAULT TRUE, is_deleted BOOLEAN DEFAULT FALSE, is_verified BOOLEAN DEFAULT FALSE, metadata VARCHAR (255) DEFAULT NULL, remember_token VARCHAR (255) DEFAULT NULL, otp varchar(10) default 0, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id));",    
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_CUSTOMER_ADDRESS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, customer_id BIGINT UNSIGNED NOT NULL, address TEXT DEFAULT NULL, country_id BIGINT UNSIGNED NOT NULL, state_id BIGINT UNSIGNED NOT NULL, city_id BIGINT UNSIGNED NOT NULL, pin VARCHAR(10) NOT NULL, land_mark VARCHAR(255) DEFAULT NULL, latitude VARCHAR(255) DEFAULT NULL, longitude VARCHAR(255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (customer_id)  REFERENCES  " + symbols.TABLE_CUSTOMERS + " (id), FOREIGN KEY (country_id)  REFERENCES  "+ symbols.TABLE_COUNTRIES+" (id), FOREIGN KEY (state_id)  REFERENCES "+ symbols.TABLE_STATES +" (id), FOREIGN KEY (city_id)  REFERENCES  "+ symbols.TABLE_CITIES +" (id) ) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_CUSTOMER_RATINGS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, customer_id BIGINT UNSIGNED NOT NULL UNIQUE, one_star INTEGER DEFAULT 0, two_star INTEGER DEFAULT 0, three_star INTEGER DEFAULT 0, four_star INTEGER DEFAULT 0, five_star INTEGER DEFAULT 0, average_rating DECIMAL(18,2) DEFAULT 0.0, comments TEXT DEFAULT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (customer_id)  REFERENCES "+ symbols.TABLE_CUSTOMERS+" (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_ORDER_STATUS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR (30) NOT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_PAYMENT_MODES  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, title VARCHAR (30) NOT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id)) ;",
        "CREATE TABLE IF NOT EXISTS "+ symbols.TABLE_ORDERS  + " ( id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, customer_id BIGINT UNSIGNED NOT NULL, customer_address_id BIGINT UNSIGNED NOT NULL, restaurant_id BIGINT UNSIGNED NOT NULL, delivery_boy_id BIGINT UNSIGNED NOT NULL, order_list TEXT DEFAULT NULL, order_status_id BIGINT UNSIGNED NOT NULL, payment_mode_id BIGINT UNSIGNED NOT NULL, is_paid BOOLEAN DEFAULT FALSE, original_amount DECIMAL DEFAULT 0.0, discount DECIMAL DEFAULT 0.0, amount_to_be_paid DECIMAL DEFAULT 0.0, delivery_related_hint VARCHAR (255) DEFAULT NULL, special_request VARCHAR (255) DEFAULT NULL, metadata VARCHAR (255) DEFAULT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (customer_id)  REFERENCES "+ symbols.TABLE_CUSTOMERS+" (id), FOREIGN KEY (customer_address_id)  REFERENCES "+ symbols.TABLE_CUSTOMER_ADDRESS+" (id), FOREIGN KEY (restaurant_id) REFERENCES "+ symbols.TABLE_RESTAURANTS+" (id), FOREIGN KEY (delivery_boy_id) REFERENCES "+ symbols.TABLE_EMPLOYEES+" (id), FOREIGN KEY (order_status_id) REFERENCES "+ symbols.TABLE_ORDER_STATUS+"(id), FOREIGN KEY (payment_mode_id) REFERENCES "+ symbols.TABLE_PAYMENT_MODES+"(id));",
    ];

    tableArr.forEach(createQuery => {
        
        dbconnection.query(createQuery, function (err, result) {
            if (err){
            console.log(createQuery);
                
                throw err;
            }
        });
    });
});

module.exports.dbconnection = dbconnection;

// fields

const TableKeys = {
    [symbols.TABLE_ADMIN]:['user_name','new_password', 'password','mobile_number','remember_token'],
    [symbols.TABLE_EMPLOYEE_REGISTER]:['mobile_number','employee_type_id','employee_name','email_id','is_signed_up','metadata','otp'],
    [symbols.TABLE_EMPLOYEES]:['country_code','mobile_number','alternate_mobile_number','email_id','first_name',
            'middle_name','last_name','father_name','new_password', 'password','profile_picture','is_profile_completed','employee_type_id',
            'employee_job_type_id','employee_slot_id','metadata','remember_token'],
    [symbols.TABLE_EMPLOYEE_PINS]:['employee_id','pins_covered'],
    [symbols.TABLE_EMPLOYEE_TRACK]:['employee_id','latitude','longitude'],
    [symbols.TABLE_EMPLOYEE_RATINGS]:['employee_id','one_star','two_star','three_star','four_star','five_star','average_rating',
        'comments','metadata'],
    [symbols.TABLE_EMPLOYEE_DOCUMENTS]:['employee_id','document_type_id','document_number','details'],
    [symbols.TABLE_EMPLOYEE_BLACK_LISTS]:['employee_id','reason'],
    [symbols.TABLE_EMPLOYEE_ADDRESS]:['employee_id','address','country_id','state_id','city_id','pin','land_mark',
    'latitude','longitude'],
    [symbols.TABLE_RESTAURANT_TYPES]:['title'],
    [symbols.TABLE_RESTAURANT_MEAL_TYPES]:['title'],
    [symbols.TABLE_RESTAURANTS]:['rest_code','contact_person','mobile_number','alternate_mobile_number','email_id','restaurant_name','opening_time','closing_time','delivery_end_time','is_delivery_boy_required','new_password', 'password','restaurant_pictures','is_active','is_deleted','is_agent_verified','is_admin_verified','restaurant_type_id','restaurant_meal_type_id','address','country_id','state_id','city_id','pin','land_mark',
    'latitude','longitude','metadata','remember_token','agent_id','radius_covered_in_km','otp'],
    [symbols.TABLE_RESTAURANT_PINS]:['restaurant_id','pins_covered'],    
    [symbols.TABLE_RESTAURANT_MENU]:['restaurant_id','menu_items','menu_tags'],
    [symbols.TABLE_AVAILABILITY]:['employee_id','is_available'],
    [symbols.TABLE_CUSTOMERS]:['country_code','mobile_number','alternate_mobile_number','email_id','first_name','middle_name','last_name','password','profile_picture','is_active','is_deleted','is_verified','metadata','remember_token','otp'],
    [symbols.TABLE_CUSTOMER_ADDRESS]:['customer_id','address','country_id','state_id','city_id','pin','land_mark',
    'latitude','longitude'],
    [symbols.TABLE_CUSTOMER_RATINGS]:['customer_id','one_star','two_star','three_star','four_star','five_star','average_rating',
    'comments','metadata'],
};

const TableWhereKey = {

    [symbols.TABLE_EMPLOYEE_REGISTER]:['mobile_number','id'],
    [symbols.TABLE_EMPLOYEES]:['mobile_number','id'],
    [symbols.TABLE_EMPLOYEE_PINS]:['employee_id','id'],
    [symbols.TABLE_EMPLOYEE_TRACK]:['employee_id'],
    [symbols.TABLE_EMPLOYEE_RATINGS]:['employee_id','id'],
    [symbols.TABLE_EMPLOYEE_DOCUMENTS]:['employee_id','id','is_verified'],
    [symbols.TABLE_EMPLOYEE_BLACK_LISTS]:['employee_id','id'],
    [symbols.TABLE_EMPLOYEE_ADDRESS]:['employee_id','id','is_verified'],
    [symbols.TABLE_ADMIN]:['user_name','id'],
    [symbols.TABLE_RESTAURANT_TYPES]:['id'],
    [symbols.TABLE_RESTAURANT_MEAL_TYPES]:['id'],
    [symbols.TABLE_RESTAURANTS]:['mobile_number','email_id','id','agent_id','rest_code'],
    [symbols.TABLE_RESTAURANT_PINS]:['restaurant_id','id'],    
    [symbols.TABLE_RESTAURANT_MENU]:['restaurant_id','id'],
    [symbols.TABLE_AVAILABILITY]:['employee_id','id'],
    [symbols.TABLE_CUSTOMERS]:['mobile_number','id'],
    [symbols.TABLE_CUSTOMER_ADDRESS]:['customer_id','id'],
    [symbols.TABLE_CUSTOMER_RATINGS]:['customer_id','id'],
};



//add restricted table and fields here
module.exports.restrictUpdateForTableKeys = {

    [symbols.TABLE_CITIES]:['id'],
    [symbols.TABLE_STATES]:['id'],
    [symbols.TABLE_COUNTRIES]:['id'],
    [symbols.TABLE_EMPLOYEE_REGISTER]:['id'],
    [symbols.TABLE_EMPLOYEES]:['id','mobile_number'],
    [symbols.TABLE_EMPLOYEE_PINS]:['id','employee_id'],
    [symbols.TABLE_EMPLOYEE_TRACK]:['id','employee_id'],
    [symbols.TABLE_EMPLOYEE_RATINGS]:['id','employee_id'],
    [symbols.TABLE_EMPLOYEE_DOCUMENTS]:['id','employee_id'],
    [symbols.TABLE_EMPLOYEE_BLACK_LISTS]:['id','employee_id'],
    [symbols.TABLE_EMPLOYEE_ADDRESS]:['id','employee_id'],
    [symbols.TABLE_ADMIN]:['id','user_name'],
    [symbols.TABLE_RESTAURANT_TYPES]:['id'],
    [symbols.TABLE_RESTAURANT_MEAL_TYPES]:['id'],
    [symbols.TABLE_RESTAURANTS]:['rest_code','mobile_number','email_id','agent_id'],
    [symbols.TABLE_RESTAURANT_PINS]:['restaurant_id'],    
    [symbols.TABLE_RESTAURANT_MENU]:['restaurant_id'],
    [symbols.TABLE_AVAILABILITY]:['employee_id','id'],
    [symbols.TABLE_CUSTOMERS]:['mobile_number','id'],
    [symbols.TABLE_CUSTOMER_ADDRESS]:['customer_id','id'],
    [symbols.TABLE_CUSTOMER_RATINGS]:['customer_id','id'],
};

module.exports.chnageFieldNameForupdate = {
    "name_from_request":['new_password','update_is_verified'],
    "replace_key_name_from_db":{"new_password":"password","update_is_verified":"is_verified"}
};

//sqls

module.exports.getData = function(query = '' ,tblName = ''){

    return new Promise((resolve, reject)=>{
        var where = '';
        if(query == ''){
            var data = symbols.REQUEST_DATA;
            module.exports.createWhereClause(tblName, data)
                .then(where => { 
                    query = "SELECT * FROM "+ tblName +" " + where;
                    dbconnection.query(query, 
                        function (err, result, fields) {
                            if (err) {
                                //log error
                                reject(err);
                            }
                            else{
                                if(result.length > 0){
                                    resolve(result);
                                }else{
                                    reject(false);
                                }
                            }
                        });
                })
                .catch(err=>{
                    console.log(err);
                    reject(false);
                    //??? log error
                });
        }else{
            dbconnection.query(query, 
                function (err, result, fields) {
                    if (err) {
                        //log error
                        reject(err);
                    }
                    else{
                        if(result.length > 0){
                            resolve(result);
                        }else{
                            reject(false);
                        }
                    }
                });
        }
        
    });
}

module.exports.insertData = function(tblName, userData = ''){
    return new Promise((resolve, reject)=>{

        var reqData;
        if(userData != ''){
            reqData = userData;
        }else{
            reqData = symbols.REQUEST_DATA;
        }
        Object.keys(reqData).forEach(function(key) {
           if(!(TableKeys[tblName].includes(key))){
                delete reqData[key];
           }
        });
        dbconnection.query("INSERT INTO "+ tblName +" SET ?", reqData, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else{
                resolve(result.insertId);
            }
        });

    });
};

module.exports.updateData = function(tblName, data, whereInTrue = false){

    return new Promise((resolve, reject)=>{
        module.exports.createUpdateQuery(tblName, data, whereInTrue)
        .then(updateQuery => {
            console.log(updateQuery);
                dbconnection.query(updateQuery, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    else{
                        resolve(true);
                    }
                });
            }
        )
        .catch(err=>{
            
            reject(false);
            //??? log error
        });
        
    });
};

module.exports.deleteData = function(tblName,id,whereInTrue = false){
    data = symbols.REQUEST_DATA;
    return new Promise((resolve, reject)=>{
        module.exports.createWhereClause(tblName, data, whereInTrue)
        .then(where => { 
            var sql = "DELETE FROM "+ tblName +" " + where;
            console.log(sql);
            dbconnection.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
            }
        )
        .catch(err=>{
            console.log(err);
            reject(false);
            //??? log error
        });
    });
};

module.exports.createUpdateQuery = function(tblName,reqData,whereInTrue = false){
    return new Promise((resolve, reject)=>{
        var data = reqData;
        var set = "set ";
        module.exports.createWhereClause(tblName, data, whereInTrue)
        .then(where => {

                for(let key in data){
                    if(TableKeys[tblName].includes(key) && !(TableWhereKey[tblName].includes(key))){
                        if(module.exports.restrictUpdateForTableKeys[tblName].indexOf(key) > -1){
                            //log trying to update restricted field
                            reject(false);
                        }
                        if(module.exports.chnageFieldNameForupdate.name_from_request.indexOf(key) > -1){
                            set += " " + module.exports.chnageFieldNameForupdate.replace_key_name_from_db[key] + " = '" + data[key] + "',";
                        }
                        else if(typeof data[key] === "boolean"){
                            set += " " + key + " = " + data[key] + ",";
                        }
                        else{
                            set += " " + key + " = '" + data[key] + "',";
                        }
                    
                    }
                }
                set = set.substring(0, set.length-1);
                var updateSql = "UPDATE " + tblName + " " + set + " " + where;
                resolve(updateSql);    
            }
        )
        .catch(err=>{
            console.log(err);
            reject(false);
            //??? log error
        });
    });
};

module.exports.createWhereClause = function(tblName, data,whereInTrue = false){
    return new Promise((resolve, reject)=>{
        var where = "where 1 ";
        var isMoreThanOneWhereCondition = false;
        for(let key in data){
            
            if (key == 'id' || TableWhereKey[tblName].includes(key)) {

                where += " and ";
                if(whereInTrue){
                    where += " " +  key + " IN (" + data[key] + ")" ;
                }
                else{
                    if(typeof data[key] === "boolean"){
                        where += " " +  key + " = " + data[key] + "" ;
                    }else{
                        where += " " +  key + " = '" + data[key] + "'" ;
                    }
                }
                isMoreThanOneWhereCondition = true;
            }
        }

        resolve(where);
        
    });
};

/*
for transaction
dbconnection.beginTransaction(function(err) {
            if (err) { reject(err); }
            dbconnection.query("INSERT INTO "+ tblName +" SET ?", reqData, function (err, result) {
                if (err) {
                    dbconnection.rollback(function() {
                        console.log(err);
                        reject(err);
                    });
                }
                else{
                    resolve(result.insertId);
                }
            });
        });*/

        /*
        1. If is_verified is true , then user cant delete or update
        2.
        */