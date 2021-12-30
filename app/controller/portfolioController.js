const connection = require('../middleware/db');
const { addForm, editForm } = require('../validations/portfolioValidation');
const { logger } = require('../logger/logger')

exports.addData = async (req, res) => {
    try {
        const { error } = addForm(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {

            const result = req.files.map(images => images.filename);
            const categoryname = req.body.categoryname;
            const pname = req.body.pname;
            const uploadImage = result;
            const ptitle = req.body.ptitle;
            const url = req.body.url;
            const pdate = req.body.pdate;

            connection.query(`SELECT id FROM tb_category where categoryname='${categoryname}'`, function (err, result) {
                const category_id = result[0].id;
                const sql = `INSERT INTO tb_portfolio (category_id,pname,uploadImage,ptitle,url,pdate) VALUES('${category_id}','${pname}','${uploadImage}','${ptitle}','${url}','${pdate}')`;
                connection.query(sql, (err, result) => {
                    if (err) {
                        logger.error('Error', err);
                    } else {
                        res.send("Data Inserted...")
                    }
                })
            })


        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.findData = async (req, res) => {
    connection.query(`SELECT tb_category.id(categoryname) FROM tb_category JOIN tb_portfolio ON tb_category.id=tb_portfolio.id`)
    let sql = `SELECT * FROM tb_portfolio`
    connection.query(sql, (err, result) => {
        if (err) {
            logger.error('Error', err);
        } else {
            res.send(result)
        }
    })
}


exports.findDataByid = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    let sql = `SELECT * FROM tb_portfolio WHERE id =${id}`
    connection.query(sql, (err, result) => {
        if (result) {
            res.send(result)
        } else {
            res.send("Invalid ID")
        }
    })
}

exports.editData = async (req, res) => {

    try {
        const { error } = editForm(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            const id = req.params.id;
            console.log(id)

            const result = req.files.map(images => images.filename);
            const categoryname = req.body.categoryname;
            const pname = req.body.pname;
            const uploadImage = result;
            const ptitle = req.body.ptitle;
            const url = req.body.url;
            const pdate = req.body.pdate;

            console.log(uploadImage);
            connection.query(`SELECT id FROM tb_category where categoryname='${categoryname}'`, function (err, result) {
                const category_id = result[0].id;
                connection.query(`UPDATE tb_portfolio SET category_id='${category_id}', pname='${pname}', uploadImage='${uploadImage}', ptitle='${ptitle}', url = '${url}',pdate='${pdate}' WHERE id ='${id}'`, function (err, response) {

                    if (response) {
                        // console.log(response);
                        res.send('Data updated')
                    } else {
                        logger.error('Error', err);
                    }
                })

            })

            connection.query(`UPDATE tb_portfolio SET pname='${pname}', uploadImage='${uploadImage}', ptitle='${ptitle}', url = '${url}',pdate='${pdate}' WHERE id ='${id}'`, function (err, response) {

                if (response) {
                    // console.log(response);
                    res.send('Data updated')
                } else {
                    logger.error('Error', err);
                }
            })
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.deleteData = async (req, res) => {
    const id = req.params;
    var countId = Object.keys(id).length;
    for (let i = 0; i < countId; i++) {
        const sql = `DELETE FROM tb_portfolio WHERE id='${id}'`
        connection.query(sql, function (err) {
            if (err) {
                logger.error("error", err)
            }
        })
    }
    return res.send('data dellted')
}

exports.multipleDelete = async (req, res) => {
    const id = req.query;
    console.log(id);
    var countId = Object.keys(id).length;
    console.log(countId);
    for (let i = 0; i < countId; i++) {
        const sql = `DELETE from tb_portfolio WHERE id = '${id}'`
        console.log(sql);
        connection.query(sql, Object.keys(id)[i], function (err) {
            if (err) {
                logger.error("error", err)
            }
        })
    }
    return res.send('data delete')
}
