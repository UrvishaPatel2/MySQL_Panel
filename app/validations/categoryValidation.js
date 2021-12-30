const Joi = require("@hapi/joi");

function addForm(req){
    // console.log("form",req);
    const schema = Joi.object({
        categoryname: Joi.string().empty().required().messages({
            "string.base": `category should be a type of text`,
            "string.empty": 'category is not allowed to be empty',
            "string.required": `category is Required`,
        })
    })

    return schema.validate(req, { abortEarly: false });
    
}

function editForm(req){
    // console.log("form",req);
    const schema = Joi.object({
        categoryname: Joi.string().empty().required().messages({
            "string.base": `category should be a type of text`,
            "string.empty": 'category is not allowed to be empty',
            "string.required": `category is Required`,
        })
    })

    return schema.validate(req, { abortEarly: false });
    
}

module.exports={
    addForm,
    editForm
}