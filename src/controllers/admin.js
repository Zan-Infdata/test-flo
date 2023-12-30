const {  TDrink, SyUser,  Db } = require("../models/db");
const db = Db.connect();


async function resetDb(_ , res){

    const sql_1 = `
        CREATE TABLE IF NOT EXISTS "sy_user" (
            "SY_USER_ID" INTEGER NOT NULL,
            "SY_USER_UUID" TEXT NOT NULL,
            "SY_USER_NAME" TEXT NOT NULL,
            PRIMARY KEY ("SY_USER_ID"))`


    const sql_2 = `CREATE TABLE IF NOT EXISTS "t_drink" (
        "T_DRINK_ID" INTEGER NOT NULL,
        "T_DRINK_TYPE" TEXT NOT NULL,
        "T_DRINK_TIME" TEXT NOT NULL,
        "SY_USER_ID" INTEGER NOT NULL,
        PRIMARY KEY ("T_DRINK_ID"))`

    const sql_3 = 'DROP TABLE IF EXISTS "sy_user";';
    const sql_4 = 'DROP TABLE IF EXISTS "t_drink";';

    db.run(sql_3);
    db.run(sql_4);
    db.run(sql_1);
    db.run(sql_2);


    return res.json({status:200, data: rows, success:true});

  
}




module.exports = {
    resetDb
}