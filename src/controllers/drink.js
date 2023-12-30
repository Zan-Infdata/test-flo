const {  TDrink, Db } = require("../models/db");
const db = Db.connect();


async function getTDrinkByUserId(req , res){

    const uid = req.query.uid;

    let qry = "";
    
    qry += "  SELECT ";
    qry += "  "+ TDrink.id +" ";
    qry += " ,"+ TDrink.type +" ";
    qry += " ,"+ TDrink.time +" ";
    
    qry += "  FROM " + TDrink.table + " ";

    qry += "  WHERE " + TDrink.userId +" = ? ";

    db.all(qry, [uid], (err, rows) => {
        if (err){
            return res.json({status:500, success: false, error: err});
        }


        return res.json({status:200, data: rows, success:true});
    });
  
}


async function addTDrink(req , res){

    const {uid, type} = req.body;

    let qry = "";
    
    qry += " INSERT INTO ";
    qry += " "  + TDrink.table + " ( ";

    qry += "  " + TDrink.type ;
    qry += " ," + TDrink.time;
    qry += " ," + TDrink.userId;
    qry += " ) ";

    qry += " VALUES ( ";
    qry += "  ?  ";
    qry += " , DATETIME('now') ";
    qry += " ,? ";
    qry += " ) ";

    console.log(qry);
    
    db.run(qry, [type, uid], (err) =>{
        if(err){
            return res.json({status:500, success: false, error: err});
        }
        
        return res.json({status: 200, success: true});
        
    });
    
  
}





module.exports = {
    getTDrinkByUserId,
    addTDrink,
}