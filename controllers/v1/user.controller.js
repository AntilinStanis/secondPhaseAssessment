const {ReS,ReE,to}=require('./../../global_functions');
const UserService=require('../../services/userSchema/user.service');
var express = require('express');
var router = express.Router();
const vaildate=require('./../../middleware/validate-schema');
const userValidator=require('./../../routes/user.validater').userValidator;
const workStatusValidator=require('./../../routes/user.validater').workStatusValidator;
const projectTaskMappingValidator=require('./../../routes/user.validater').projectTaskMappingValidator;
const taskValidator=require('./../../routes/user.validater').taskValidator;
const ProjectVaildator=require('./../../routes/user.validater').projectValidator;


/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertUser
Method insertUser which is used to insert  the 
user Details from the employee table through payload.
@param {*} data it hold all the details
@returns if data fetched then return else run null or error message
*/ 
const insertUser= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(UserService.insertU(bodyData));
    console.log(bodyData);
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)

}

/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertTask
Method insertTask which is used to insert  the 
Task Details from the employee table through payload.
@param {*} data it hold all the details 
@returns if data fetched then return else run null or error message
*/ 
const insertTask= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(UserService.insertT(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)

}


/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertProject
Method insertProject which is used to insert  the 
Project Details from the employee table through payload.
@param {*} data it hold all the details 
@returns if data fetched then return else run null or error message
*/ 
const insertProject= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(UserService.insertP(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)

}


/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertWorkStatus
Method insertWorkStatus which is used to insert  the 
WorkStatus Details to the workStatus table through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 
const insertWorkStatus= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(UserService.insertW(bodyData));
    console.log(bodyData);
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)

}

/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertProjectTaskMapping
Method insertProjectTaskMapping which is used to insert  the 
insertProjectTaskMapping Details to the workStatus table through payload.
@param {*} data it hold all the details 
@returns if data fetched then return else run null or error message
*/ 
const insertProjectTaskMapping= async function(req,res){
    let bodyData=req && req.body? req.body:null
    let[err,data]=await to(UserService.insertPTM(bodyData));
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)

}
/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: getWorkStatus
Method getWorkStatus which is used to get  the 
workstatus Details from the workstatus table through payload.
@param {*} id it hold all the details 
@returns if data fetched then return else run null or error message
*/ 
const getWorkStatus= async function(req,res){
    let bodyData=req && req.params? req.params:null
    console.log(bodyData);
    // let[err,data]=await to(UserService.getWorkStatus(bodyData.id));
    // console.log(bodyData);
    // if(err)return ReE(res,err,422)
    // if(data)return ReS(res,data,200)

}



/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: updateWorkStatus
Method updateWorkStatus which is used to update  the 
workstatus table Details  through payload.
@returns if data fetched then return else run null or error message
*/ 
const updateWorkStatus= async function(req,res){
    let bodyData=req && req.body? req.body:null;
    let[err,data]=await to(UserService.updateWorkDetails(bodyData));
    // console.log(bodyData);
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)
}
/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: deleteWorkStatus
Method deleteWorkStatus which is used to delete the 
workStatus Details  through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 
const deleteWorkStatus= async function(req,res){
    
    let bodyData=req && req.body? req.body:null;

    let[err,data]=await to(UserService.deleteWorkDetails(bodyData));
    // console.log(bodyData);
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)


}
/**
 * Orginal Author:Antilin Stanis
 * Author:Antilin Stanis
 * Created On:24/05/2023
 * Modifies On:24/05/2023
 * Function:includeTables
 * Method includeTables which is used to get  Project table details along 
 * with the details of ProjectTaskMapping table
 * @param {*} data it holds the data of the Project and ProjectTaskMapping Table
 * @returns  if data fetched then else error message
 */
const includeTables=async function(req,res){
    let[err,data]=await to(UserService.includeT());
    if(err)return ReE(res,err,422)
    if(data)return ReS(res,data,200)
}

const querryParams=async function(req,res){
    console.log("The values are",req.query);
}


module.exports={router,insertUser,insertProject,insertProjectTaskMapping,insertTask,
    insertWorkStatus,getWorkStatus,updateWorkStatus,deleteWorkStatus};

router.post('/insertUser',userValidator.createUser,vaildate.validate,insertUser);
router.post('/insertProject',ProjectVaildator.createProject,vaildate.validate,insertProject);
router.post('/insertWorkStatus',workStatusValidator.createWorkStatus,vaildate.validate,insertWorkStatus);
router.post('/insertProjectTaskMapping',projectTaskMappingValidator.createProjectTaskMapping,vaildate.validate,insertProjectTaskMapping);
router.post('/insertTask',taskValidator.createTask,vaildate.validate,insertTask);
//tasks
router.get('/getWorkStatus/:id',getWorkStatus);
router.post('/updateWorkDetails',updateWorkStatus);
router.put('/deleteWorkStatus',deleteWorkStatus);
router.get('/includeTable',includeTables);
router.get('/queryparams',querryParams)