const connection = require('../middleware/db');
const {addForm,editForm} = require('../validations/contactValidation')

exports.addData =(req,res)=>{
    try{
        const {error} = addForm(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }else{
            const name= req.body.name;
            const designation=req.body.designation;
            const description= req.body.description;
            const uploadImage=req.file.filename;
            console.log(uploadImage);
            const sql = `INSERT INTO tb_testimonial (name,designation,description,uploadImage) VALUES('${name}','${designation}','${description}','${uploadImage}')`;
                connection.query(sql,(err,result)=>{
                    if(err){
                         logger.error('Error', err);
                    }else{
                        res.send("Data Inserted...")
                    }
                })
        }
    }catch(err){
         logger.error('Error', err);
    }
}

exports.findData =(req,res)=>{
    let sql  = `SELECT * FROM tb_testimonial`
    connection.query(sql,(err,result)=>{
        if(err){
             logger.error('Error', err);
        }else{
            res.send(result)
        }
    })
}

exports.findDataByid =(req,res)=>{
    const id = req.params.id;
    // console.log(id);
    let sql  = `SELECT * FROM tb_testimonial WHERE id =${id}`
    connection.query(sql,(err,result)=>{
        if(err){
             logger.error('Error', err);
        }else{
            res.send(result)
        }
    })
}

exports.editData =(req,res)=>{
    try{
        const {error} = editForm(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }else{
            const id = req.params.id;
            console.log(id)

            const name= req.body.name;
            const designation=req.body.designation;
            const description= req.body.description;
            const uploadImage=req.file.filename;
            console.log(uploadImage);
            connection.query(`UPDATE tb_testimonial SET name='${name}', designation='${designation}', description='${description}', uploadImage = '${uploadImage}' WHERE id ='${id}'`, function(err, response){
                if(response){
                    // console.log(response);
                    res.send('Data updated')
                }else{
                     logger.error('Error', err);
                }
            })
        }
    }catch(err){
         logger.error('Error', err);
    }
}

exports.deleteData =(req,res)=>{
    const id = req.params.id;
    console.log(id);
    let sql = `DELETE FROM tb_testimonial WHERE id=${id}`
    connection.query(sql,(err,result)=>{
        if(err){
             logger.error('Error', err);
        }else{
            res.send("data deleted")
        }
    }) 
}