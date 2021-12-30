const connection = require('../middleware/db');
const {addForm,editForm} = require('../validations/contactValidation')

exports.addData = async(req,res)=>{
    try{
        const {error}=addForm(req.body)
        if(error){
            return res.status(400).send(error.details[0].message);
        }else{
            const name= req.body.name;
            const email=req.body.email;
            const contactnumber= req.body.contactnumber;
            const message=req.body.message;
            const date=req.body.date;
            const sql = `INSERT INTO tb_contact(name,email,contactnumber,message,date) VALUES('${name}','${email}','${contactnumber}','${message}','${date}')`;
            connection.query(sql,(err,result)=>{
                if(err){
                     logger.error('Error', err);
                }else{
                    res.send("Data Inserted...")
                }
            })
        }
    }catch(err){

    }

}

exports.findData = async(req,res)=>{
    let sql  = `SELECT * FROM tb_contact`
    connection.query(sql,(err,result)=>{
        if(err){
             logger.error('Error', err);
        }else{
            res.send(result)
        }
    })
}

exports.findDataByid = async(req,res)=>{
    const id = req.params.id;
    // console.log(id);
    let sql  = `SELECT * FROM tb_contact WHERE id =${id}`
    connection.query(sql,(err,result)=>{
        if(err){
             logger.error('Error', err);
        }else{
            res.send(result)
        }
    })
}

exports.editData = async(req,res)=>{

    const {error}=editForm(req.body)
        if(error){
            return res.status(400).send(error.details[0].message);
        }else{
            const id = req.params.id;

            const name= req.body.name;
            const email=req.body.email;
            const contactnumber= req.body.contactnumber;
            const message=req.body.message;
            const date=req.body.date;
            connection.query(`UPDATE tb_contact SET name='${name}', email='${email}', contactnumber='${contactnumber}', message = '${message}',date='${date}' WHERE id ='${id}'`, function(err, response){
        
                if(response){
                    // console.log(response);
                    res.send('Data updated')
                }else{
                     logger.error('Error', err);
                }
            }) 
        }

}

exports.deleteData = async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    let sql = `DELETE FROM tb_contact WHERE id=${id}`
    connection.query(sql,(err,result)=>{
        if(err){
             logger.error('Error', err);
        }else{
            res.send("data deleted")
        }
    }) 
}