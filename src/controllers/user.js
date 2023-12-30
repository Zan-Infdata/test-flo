const {  SyUser, Db, TDrink } = require("../models/db");
const db = Db.connect();


async function getSyUserList(_ , res){

    let qry = "";
    
    qry += "  SELECT ";
    qry += "  "+ SyUser.id +" ";
    qry += " ,"+ SyUser.name +" ";
    qry += " ,"+ SyUser.uuid +" ";
    
    qry += "  FROM " + SyUser.table + " ";

    db.all(qry, [], (err, rows) => {
        if (err){
            return res.json({status:500, success: false, error: err});
        }

        return res.json({status:200, data: rows, success:true});
    });
  
}

async function getSyUserDrinkList(_ , res){

    let qry = "";
    
    qry += "  SELECT ";
    qry += "  u."+ SyUser.id +" ";
    qry += " ,u."+ SyUser.name +" ";
    qry += " ,u."+ SyUser.uuid +" ";
    qry += " , count(d."+TDrink.id+") as SY_USER_DRINKS ";
    
    qry += "  FROM " + SyUser.table + " AS u ";
    qry += "  LEFT OUTER JOIN " + TDrink.table + " AS d";
    qry += "  ON u." + SyUser.id + " = d."+ TDrink.userId +" ";
    qry += "  GROUP BY u." +SyUser.id + " ";
    qry += "  ORDER BY SY_USER_DRINKS DESC";


    db.all(qry, [], (err, rows) => {
        if (err){
            return res.json({status:500, success: false, error: err});
        }

        return res.json({status:200, data: rows, success:true});
    });
  
}

async function getSyUserByUUID(req , res){

    const uuid = req.query.uuid;

    let qry = "";
    
    qry += "  SELECT ";
    qry += "  "+ SyUser.id +" ";
    qry += " ,"+ SyUser.name +" ";
    
    qry += "  FROM " + SyUser.table + " ";
    qry += "  WHERE " + SyUser.uuid + " = ? ";

    db.all(qry, [uuid], (err, rows) => {
        if (err){
            return res.json({status:500, success: false, error: err});
        }

        return res.json({status:200, data: rows, success:true});
    });
  
}

async function getSyUserById(req , res){

    const uid = req.query.uid;

    let qry = "";
    
    qry += "  SELECT ";
    qry += "  "+ SyUser.uuid +" ";
    qry += " ,"+ SyUser.name +" ";
    
    qry += "  FROM " + SyUser.table + " ";
    qry += "  WHERE " + SyUser.id + " = ? ";

    db.all(qry, [uid], (err, rows) => {
        if (err){
            return res.json({status:500, success: false, error: err});
        }

        return res.json({status:200, data: rows, success:true});
    });
  
}


async function addSyUser(req , res){

    const {name, uuid} = req.body;

    let qry = "";
    
    qry += " INSERT INTO ";
    qry += " "  + SyUser.table + " ( ";

    qry += "  " + SyUser.name ;
    qry += " ," + SyUser.uuid;
    qry += " ) ";

    qry += " VALUES ( ";
    qry += "  ?  ";
    qry += " ,? ";
    qry += " ) ";
    

    db.run(qry, [name, uuid], (err) =>{
        if(err){
            return res.json({status:500, success: false, error: err});
        }
        
        return res.json({status: 200, success: true});
        
    });
}



async function deleteSyUser(req , res){

    const {uid} = req.body;

    let qry = "";
    
    qry += " DELETE FROM ";
    qry += " "  + SyUser.table + " ";
    
    qry += "  WHERE " + SyUser.id + " = (?) ";
    

    db.run(qry, uid, (err) =>{
        if(err){
            return res.json({status:500, success: false, error: err});
        }
        
        qry = "";
    
        qry += " DELETE FROM ";
        qry += " "  + TDrink.table + " ";
        
        qry += "  WHERE " + TDrink.userId + " = (?) ";
        
    
        db.run(qry, uid, (err) =>{
            if(err){
                return res.json({status:500, success: false, error: err});
            }
            
            return res.json({status: 200, success: true});
            
        });
        
    });



}



module.exports = {
    getSyUserList,
    addSyUser,
    deleteSyUser,
    getSyUserByUUID,
    getSyUserById,
    getSyUserDrinkList
}