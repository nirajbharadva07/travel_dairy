const roleModel = require("../models/Role_Model.js")

const getAllRoles = async(req,res)=>{

    const role = await roleModel.find().populate("role")
    res.json({
        message :"role fetched sucessfully",
        data : role
    });
};

const createAllRoles = async (req,res)=>{

    // console.log("data created sucessfully",req.body)
    const savedRoles = await roleModel.create(req.body)
    res.json({
        message :"model created sucessfully",
        data:savedRoles
    })
}

const deleteRole = async (req, res)=>{
    const deleterole = await roleModel.findByIdAndDelete(req.params.id)
    console.log(req.params.id)
    console.log(deleterole)
    res.json({
        message:'role deleted sucessfully',
        data:deleterole
    })
}

const getRoleByid = async(req,res)=>{
    const foundRole = await roleModel.findById(req.params.id)
    res.json({
        message:"data found",
        data:foundRole,
    })
}

module.exports ={
    getAllRoles,createAllRoles,deleteRole,getRoleByid
}