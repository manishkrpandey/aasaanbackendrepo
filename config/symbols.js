module.exports = {

    TABLE_ADMIN: 'admin',

    TABLE_EMPLOYEE_TYPES: 'employee_types',
    TABLE_DOCUMENT_TYPES: 'document_types',
    TABLE_EMPLOYEE_JOB_TYPES: 'employee_job_types',
    TABLE_EMPLOYEE_SLOTS: 'employee_slots',
    TABLE_EMPLOYEE_REGISTER: 'employee_register',
    TABLE_EMPLOYEES: 'employees',
    TABLE_EMPLOYEE_TRACK: 'employee_track',
    TABLE_EMPLOYEE_RATINGS: 'employee_ratings',
    TABLE_EMPLOYEE_DOCUMENTS: 'employee_documents',
    TABLE_EMPLOYEE_BLACK_LISTS: 'employee_black_lists',
    TABLE_EMPLOYEE_ADDRESS: 'employee_address',
    TABLE_COUNTRIES: 'countries',
    TABLE_STATES: 'states',
    TABLE_CITIES: 'cities',
    TABLE_RESTAURANT_TYPES:'restaurant_types',
    TABLE_RESTAURANT_MEAL_TYPES:'restaurant_meal_types',
    TABLE_RESTAURANTS:'restaurants',
    TABLE_RESTAURANT_MENU:'restaurant_menu',
    TABLE_RESTAURANT_PINS:'restaurant_pins',
    TABLE_AVAILABILITY:'availability',
    TABLE_CUSTOMERS:"customers",
    TABLE_CUSTOMER_RATINGS: 'customer_ratings',
    TABLE_CUSTOMER_ADDRESS: 'customer_address',
    TABLE_ORDER_STATUS:'order_status',
    TABLE_ORDERS: 'orders',
    
    GET_API_ALL: "/apis",
    
    API_EMPLOYEE: "/employee",
    API_ADMIN: "/admin",
    API_GENERAL:"/gen",
    API_RESTAURANT:"/restaurant",
    API_CUSTOMER:"/customer",
    API_ORDER:"/order",
    
    POST_REGISTER: "/register",
    POST_CREATE: "/create",
    POST_LOGIN: "/login",
    POST_UPDATE: "/update",
    POST_DELETE: "/delete",

    GET_RETRIEVE: "/retrieve",
    GET_RETRIEVE_ALL:"/retrieveall",
    
    POST_REGISTER_EMPLOYEE:"/registeremployee",
    POST_DOCUMENT:"/document",

    POST_IS_REGISTERED:"/isregistered",
    POST_VERIFY_OTP:"/verifyotp",

    POST_ORDER_PLACED: "/place",
    POST_ORDER_CONFIRMED: "/confirm",
    POST_ORDER_REJECTED: "/reject",
    POST_ORDER_PICKED: "/picked",
    POST_ORDER_DELIVERED: "/delivered",
    POST_ORDER_GET: "/GET",

    COMMAND_ACTIONS: "/actions",

    //commands
    COMMAND_ADDRESS_SET: "setaddress",
    COMMAND_ADDRESS_GET: "getaddress",
    COMMAND_ADDRESS_UPDATE: "updateaddress",
    COMMAND_ADDRESS_DELETE: "deleteaddress",
    COMMAND_DOCUMENT_TYPE_GET: "getdocumenttype",
    COMMAND_EMPLOYEE_TYPE_GET: "getemployeetype",
    COMMAND_EMPLOYEE_JOB_TYPE_GET: "getemployeejobtype",
    COMMAND_EMPLOYEE_SLOT_GET: "getemployeeslot",
    COMMAND_STATES_GET: "getstates",
    COMMAND_CITY_GET: "getcities",
    COMMAND_COUNTRY_GET: "getcountries",
    COMMAND_GET_RESTAURANTS: "getrestaurants",
    COMMAND_AVAILABILITY_UPDATE: "updateavailability",
    COMMAND_TRACK_UPDATE: "updatetrack",
    COMMAND_AVAILABILITY_GET: "getavailability",
    COMMAND_TRACK_GET: "gettrack",
    COMMAND_DELIVERY_BOY_GET: "getdeliveryboy",
    COMMAND_CUSTOMER_GET:"getcustomer",

    //Restaurant
    COMMAND_RESTAURANT_TYPE_GET:'getrestauranttype',
    COMMAND_RESTAURANT_MEAL_TYPE_GET:'getrestaurantmealtype',
    COMMAND_RESTAURANT_VERIFY:'verifyrestaurant',
    COMMAND_RESTAURANT_MENU_SET:'setmenu',
    COMMAND_RESTAURANT_MENU_GET:'getmenu',
    COMMAND_RESTAURANT_MENU_UPDATE:'updatemenu',
    COMMAND_RESTAURANT_MENU_DELETE:'deletemenu',

    COMMAND_SEARCH_ITEMS:"searchitems",

    COMMAND_INSERT:"insert",
    COMMAND_UPDATE:"update",
    COMMAND_DELETE:"delete",
    COMMAND_RETRIEVE:"retrieve",

    REQUEST_DATA:[],
    RESPONSE_STATUS_CODE:200,
    RESPONSE_CONTENT_TYPE:'application/json',
   
    CONSTANT_THUMBMNAILS_DIRECTORY_NAME: 'thumbnails',
    CONSTANT_THUMBMNAILS_FILE_NAME:'',
    CONSTANT_THUMBMNAILS_WIDTH:340,
    CONSTANT_THUMBMNAILS_HEIGHT:260,

    ORDER_STATUS_PLACED:1,
    ORDER_STATUS_REJECTED:2,
    ORDER_STATUS_CONFIRMED:3,
    ORDER_STATUS_DELIVERY_BOY_ASSIGNED:4,
    ORDER_STATUS_PICKED:5,
    ORDER_STATUS_DELIVERED:6,

    SOCKET_ACTION_PLACED:'order_placed',
    SOCKET_ACTION_REJECTED:'order_rejected',
    SOCKET_ACTION_CONFIRMED:'order_confirmed',
    SOCKET_ACTION_DELIVERY_BOY_ASSIGNED:'order_delivery_boy_assigned',
    SOCKET_ACTION_PICKED:'order_picked',
    SOCKET_ACTION_DELIVERED:'order_delivered',
    SOCKET_ACTION_DELIVERY_BOY_ASSIGN_FAILED:'order_delivery_boy_assign_failed',

    CONSTANT_URL_PRE:'http://',
    CONSTANT_SERVER_HOST: '159.65.148.202',
    CONSTANT_SERVER_PORT: 9000,

    //flags
    IS_ADMIN: '',
    IS_AGENT: '',
    IS_DELIVERY_BOY: '',
    IS_RESTAURANT: '',
    IS_CUSTOMER:'',

    FLAG_ADMIN: "admin",
    FLAG_AGENT: 'agent',
    FLAG_DELIVERY_BOY: 'deliveryboy',
    FLAG_RESTAURANT: 'restaurant',
    FLAG_CUSTOMER: 'CUSTOMER',

    EMPLOYEE_TYPE_AGENT:1,
    EMPLOYEE_TYPE_DELIVERY_BOY:2,
    
    CONSTANT_RESPONSE_SUCCESS:'success',
    CONSTANT_RESPONSE_ERROR:'error',
}

const JSON_COMMANDS = {
    "help" : "Use any one of the The following REST API's paths",
    "get": [
        {
            "description": "Get all APIs",
            "path": module.exports.GET_APIS,
            "params": {}
        },
        {
            "description": "Employee retrieve",
            "path": module.exports.API_EMPLOYEE + module.exports.GET_RETRIEVE,
            "params": {
                "id":"1"
            }
        },
        {
            "description": "Employee GET address",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getaddress",
                "employee_id":"1"
            }
        },
        {
            "description": "Employee GET Document",
            "path": module.exports.API_EMPLOYEE + module.exports.POST_DOCUMENT,
            "params": {
                "command":"retrieve",
                "employee_id":"1"
            }
        },
        {
            "description": "Get employee type",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getemployeetype",
            }
        },
        {
            "description": "Get employee slots",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getemployeeslot",
            }
        },
        {
            "description": "Get employee job types",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getemployeejobtype",
            }
        },
        {
            "description": "Get Document types",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getdocumenttype",
            }
        },
        {
            "description": "Get Cities",
            "path": module.exports.API_GENERAL + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getcities",
                "help":"for statewise city send state_id=1",
            }
        },
        {
            "description": "Get States",
            "path": module.exports.API_GENERAL + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getstates",
            }
        },
        {
            "description": "Get Countries",
            "path": module.exports.API_GENERAL + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getcountries",
            }
        },
        {
            "description": "Search dishes and restaurants",
            "path": module.exports.API_GENERAL + module.exports.COMMAND_ACTIONS,
            "params":{
                "command":"searchitems",
                "menu_tags":"rasagulla veg",
                "latitude":"28.703772",
                "longitude":"77.109724",
                "isLocationCheckOn":"on(for customer)/off(for bulk)",
                "example":"127.0.0.1:9000/gen/actions?command=searchitems&menu_tags=rasagulla veg&latitude=28.703772&longitude=77.109724&isLocationCheckOn=on"
            }
        },
        {
            "description": "Get Restaurant Types",
            "path": module.exports.API_RESTAURANT + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getrestauranttype",
            }
        },
        {
            "description": "Get Restaurant Meal Types",
            "path": module.exports.API_RESTAURANT + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getrestaurantmealtype",
            }
        },
        {
            "description": "Get Restaurant from Restaurant",
            "path": module.exports.API_RESTAURANT + module.exports.GET_RETRIEVE,
            "params": {
                "id":"1"
            }
        },
        {
            "description": "Retrieve Restaurant menu",
            "path": module.exports.API_RESTAURANT + module.exports.COMMAND_ACTIONS,
            "params":{	
                "command":"getemenu",
                "restaurant_id":"3",
                "You may send id":"1"
            }
        },
        {
            "description": "Customer Retrieve",
            "path": module.exports.API_CUSTOMER + module.exports.GET_RETRIEVE,
            "params": {
                "id":"1"
            }
        },
        {
            "description": "Customer GET address",
            "path": module.exports.API_CUSTOMER + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"getaddress",
                "customer_id":"1"
            }
        }    

    ],
    "post": [
        {
            "description": "Admin Login",
            "path": module.exports.API_ADMIN + module.exports.POST_LOGIN,
            "params": {
                "user_name":"azhar",
                "password":"azhar"
            }
        },
        {
            "description": "Admin Employee Register Insert",
            "path": module.exports.API_ADMIN + module.exports.POST_REGISTER_EMPLOYEE,
            "params": {
                "command":"insert",
                "remember_token":"new_token",
                "mobile_number": "981103",
                "employee_type_id": "1",
                "emplyee_name":"jamwant yadav",
                "email_id":"jamwant@gmail.com"
            }
        },
        {
            "description": "Admin Employee Register Update",
            "path": module.exports.API_ADMIN + module.exports.POST_REGISTER_EMPLOYEE,
            "params": {
                "command":"update",
                "id":"1",
                "remember_token":"new_token",
                "mobile_number": "981103",
                "employee_type_id": "1",
                "emplyee_name":"jamwant yadav",
                "email_id":"jamwant@gmail.com"
            }
        },
        {
            "description": "Admin Employee Register retrieve",
            "path": module.exports.API_ADMIN + module.exports.POST_REGISTER_EMPLOYEE,
            "params": {
                "command":"retrieve",
                "remember_token":"new_token",
                "id":"1",
                "Hint!!!":"If you give id then it fetch only for this id"
            }
        },
        {
            "description": "Admin Employee Register Delete",
            "path": module.exports.API_ADMIN + module.exports.POST_REGISTER_EMPLOYEE,
            "params": {
                "command":"delete",
                "remember_token":"new_token",
                "id":"1",
                "Hint!!!":"If this is signed up then cant delete"
            }
        },
        {
            "description": "Get Restaurant From Admin",
            "path": module.exports.API_ADMIN + module.exports.COMMAND_ACTIONS,
            "params": {
                "remember_token":"new_token",
                "command":"getrestaurants"
            }
        },
        {
            "description": "Verify Restaurant by Admin",
            "path": module.exports.API_ADMIN + module.exports.COMMAND_ACTIONS,
            "params": {
                "remember_token":"new_token",
                "command":'"' + module.exports.COMMAND_RESTAURANT_VERIFY + '"'
            }
        },
        {
            "description": "Get Customers by admin",
            "path": module.exports.API_ADMIN + module.exports.COMMAND_ACTIONS,
            "params": {
                "remember_token":"new_token",
                "command":'"' + module.exports.COMMAND_CUSTOMER_GET + '"'
            }
        },
        {
            "description": "Check is employee registered",
            "path": module.exports.API_EMPLOYEE + module.exports.POST_IS_REGISTERED,
            "params": {
                "mobile_number":"9811035342",
                "employee_type_id":"1"
            }
        },
        {
            "description": "Verify OTP",
            "path": module.exports.API_EMPLOYEE + module.exports.POST_VERIFY_OTP,
            "params": {
                "mobile_number":"9811035342",
                "employee_type_id":"1",
                "otp":"1234"
            }
        },
        {
            "description": "Employee Create - Signup",
            "path": module.exports.API_EMPLOYEE + module.exports.POST_CREATE,
            "params": {
                "country_code":"91", 
                "mobile_number":"9811035342", 
                "alternate_mobile_number":"", 
                "email_id":"afzal@gmail.com", 
                "first_name":"sayed", 
                "middle_name":"", 
                "last_name":"sabri", 
                "father_name":"father", 
                "password":"abcd",   
                "employee_type_id":"1", 
                "employee_job_type_id":"1", 
                "employee_slot_id":"1"
            }
        },
        {
            "description": "Employee Login",
            "path": module.exports.API_EMPLOYEE + module.exports.POST_LOGIN,
            "params": {
                "mobile_number":"9811035342", 
                "password":"abcd"   
           }
        },
        {
            "description": "Employee Update",
            "path": module.exports.API_EMPLOYEE + module.exports.POST_UPDATE,
            "params": {
                "id":"1", 
                "first_name":"sayed"
            }
        },
        {
            "description": "Employee Insert Address",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"setaddress",//getaddress,updateaddress,deleteaddress, send data according to command
                "employee_id":"1",
                "address":"1104 km32 jpkosmos",
                "country_id":"91",
                "state_id":"27",
                "city_id":"19",
                "pin":"233001",
                "land_mark":"kosmos"
            }
        },
        {
            "description": "Employee Update Address",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params":{
                "command":"updateaddress",
                "id":"6",
                "address":"908 ghaziabad",
                "land_mark":"here"
            }
        },
        {
            "description": "Employee Delete Address",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params":{
                "command":"deleteaddress",
                "id":"7"
            }
        },
        {
            "description": "Employee Insert Document",
            "path": module.exports.API_EMPLOYEE + module.exports.POST_DOCUMENT,
            "params": {
                "command":"insert",
                "employee_id":"5",
                "document_type_id":"1",
                "document_number":"1234",
                "details":""
            }
        },
        {
            "description": "Employee Update Document",
            "path": module.exports.API_EMPLOYEE + module.exports.POST_DOCUMENT,
            "params":{
                "command":"update",
                "id":"2",
                "document_number":"123499999",
                "details":""
            }
        },
        {
            "description": "Employee Delete Document",
            "path": module.exports.API_EMPLOYEE + module.exports.POST_DOCUMENT,
            "params":{
                "command":"delete",
                "id":"2"
            }
        },
        {
            "description": "Update track for Delivery boy",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params":{
                "command":"updatetrack",
                "employee_id":"8",
                "latitude":"1.9",
                "longitude":"1.787878"
            }
        },
        {
            "description": "Update Is Available for Delivery boy",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params":{
                "command":"updateavailability",
                "employee_id":"8",
                "is_available":false
            }
        },
        {
            "description": "Get Restaurant From Employee",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params": {
                "remember_token":"new_token",
                "command":"getrestaurants"
            }
        },
        {
            "description": "Verify Restaurant by Agent",
            "path": module.exports.API_EMPLOYEE + module.exports.COMMAND_ACTIONS,
            "params": {
                "remember_token":"new_token",
                "command":'"' + module.exports.COMMAND_RESTAURANT_VERIFY + '"'
            }
        },
        {
            "description": "Restaurant Create",
            "path": module.exports.API_RESTAURANT + module.exports.POST_CREATE,
            "params": {
                "contact_person":"Amit",
                "mobile_number":"9452438872",
                "alternate_mobile_number":"1234",
                "email_id":"brijkirasoi@gmail.com",
                "restaurant_name":"brij ki rasoi",
                "opening_time":"10:00AM",
                "closing_time":"09:00PM",
                "delivery_end_time":"08:00pm",
                "is_delivery_boy_required":true,
                "distance_coverd_in_km":5,
                "restaurant_type_id":"1",
                "restaurant_meal_type_id":"2",
                "address":"sitapur road",
                "country_id":"91",
                "state_id":"27",
                "city_id":"190",
                "pin":"223230",
                "land_mark":"Sitapur road",
                "latitude":"11.981891",
                "longitude":"11.2222",
                "agent_id":"1",
                "agent_type_id":"1"    
            }
        },
        {
            "description": "Restaurant Update",
            "path": module.exports.API_RESTAURANT + module.exports.POST_UPDATE,
            "params": {
                "contact_person":"Amit",
                "alternate_mobile_number":"1234",
                "id":"1"   
            }
        },
        {
            "description": "Restaurant Delete",
            "path": module.exports.API_RESTAURANT + module.exports.POST_DELETE,
            "params": {
                "id":"1"   
            }
        },
        {
            "description": "Verify restaurant and set restaurant password",
            "path": module.exports.API_RESTAURANT + module.exports.COMMAND_ACTIONS,
            "params":{	
                "command":"verifyrestaurant",
                "rest_code":"xxxx1234",
                "mobile_number":"9452438872",
                "password":"password"
            }
        },
        {
            "description": " Create or set Restaurant menu",
            "path": module.exports.API_RESTAURANT + module.exports.COMMAND_ACTIONS,
            "params":{	
                "command":"setmenu",
                "menu_items":"sdnksadjlksad",
                "menu_tags":"#veg #sweets",
                "restaurant_id":"3",
                "You may send id":"1"
            }
        },
        {
            "description": "update Restaurant menu",
            "path": module.exports.API_RESTAURANT + module.exports.COMMAND_ACTIONS,
            "params":{	
                "command":"updatemenu",
                "menu_items":"{\"a\":\"a\",\"b\",\"b\"}",
                "restaurant_id":"3",
                "You may send id":"1"
            }
        },
        {
            "description": "Delete Restaurant menu",
            "path": module.exports.API_RESTAURANT + module.exports.COMMAND_ACTIONS,
            "params":{	
                "command":"deletemenu",
                "restaurant_id":"3",
                "You may send id":"1"
            }
        },
        {
            "description": "Customer Register",
            "path": module.exports.API_CUSTOMER + module.exports.POST_REGISTER,
            "params": {
                "mobile_number": "981103"
            }
        },
        {
            "description": "Customer Verify OTP",
            "path": module.exports.API_CUSTOMER + module.exports.POST_VERIFY_OTP,
            "params": {
                "mobile_number": "981103"
            }
        },
        {
            "description": "Customer Signup",
            "path": module.exports.API_CUSTOMER + module.exports.POST_CREATE,
            "params": {
                "country_code":"91", 
                "mobile_number":"9811035342", 
                "alternate_mobile_number":"", 
                "email_id":"mohan@gmail.com", 
                "first_name":"ahzar", 
                "middle_name":"", 
                "last_name":"sabri",  
                "password":"abcd",
                "id":"1"
            }
        },
        {
            "description": "Customer Login",
            "path": module.exports.API_CUSTOMER + module.exports.POST_LOGIN,
            "params": {
                "mobile_number":"9811035342", 
                "password":"abcd",
            }
        },
        {
            "description": "Customer Update",
            "path": module.exports.API_CUSTOMER + module.exports.POST_UPDATE,
            "params": {
                "country_code":"91", 
                "mobile_number":"9811035342", 
                "alternate_mobile_number":"", 
                "email_id":"mohan@gmail.com", 
                "first_name":"ahzar", 
                "middle_name":"", 
                "last_name":"sabri",  
                "password":"abcd",
                "id":"1"
            }
        },
        {
            "description": "Customer Delete",
            "path": module.exports.API_CUSTOMER + module.exports.POST_DELETE,
            "params": {
                "id":"1"
            }
        },        {
            "description": "Customer Insert Address",
            "path": module.exports.API_CUSTOMER + module.exports.COMMAND_ACTIONS,
            "params": {
                "command":"setaddress",//getaddress,updateaddress,deleteaddress, send data according to command
                "customer_id":"1",
                "address":"1104 km32 jpkosmos",
                "country_id":"91",
                "state_id":"27",
                "city_id":"19",
                "pin":"233001",
                "land_mark":"kosmos"
            }
        },
        {
            "description": "Customer Update Address",
            "path": module.exports.API_CUSTOMER + module.exports.COMMAND_ACTIONS,
            "params":{
                "command":"updateaddress",
                "id // u may give customer id":"6",
                "address":"908 ghaziabad",
                "land_mark":"here"
            }
        },
        {
            "description": "Customer Delete Address",
            "path": module.exports.API_CUSTOMER + module.exports.COMMAND_ACTIONS,
            "params":{
                "command":"deleteaddress",
                "id // u may give customer id":"7"
            }
        }    
    ]
};

module.exports.JSON_COMMANDS = JSON_COMMANDS;