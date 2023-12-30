const sqlite = require('sqlite3').verbose();
const path = require('path');

class Db {

    static connect(){
        const out = new sqlite.Database(path.join(__rootname,'dsdb.db'), sqlite.OPEN_READWRITE, (e) => {
            if(e){
                return console.log(e);
            }
        });

        return out;
    }

    static prepareLikeParam(param){
        return "%" + param + "%";
    }

}




class TDrink {
    static table = "t_drink";
    static id = "T_DRINK_ID";
    static type = "T_DRINK_TYPE";
    static time = "T_DRINK_TIME";
    static userId = "SY_USER_ID";
} 

class SyUser {
    static table = "sy_user";
    static id = "SY_USER_ID";
    static uuid = "SY_USER_UUID";
    static name = "SY_USER_NAME";
}




module.exports = {
    SyUser,
    TDrink,
    Db
}