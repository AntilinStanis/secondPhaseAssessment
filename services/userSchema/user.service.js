const Project=require('./../../models').project;
const ProjectTaskMapping=require('./../../models').projectTaskMapping;
const Task=require('./../../models').task;
const User=require('./../../models').user;
const WorkStatus=require('./../../models').workStatus;
const {TE,to}=require('./../../global_functions');
/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertU
Method insertU which is used to insert  the 
user Details from the employee table through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 
const insertU=async function(bodyData){
    let[err,data]=await to(User.create(bodyData));
    if(err)return TE(err.message);
    if(data)return {data}
}
module.exports.insertU=insertU;

/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertT
Method getEmployee which is used to get  the 
Employee Details from the employee table through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 
const insertT=async function(bodyData){
    let[err,data]=await to(Task.create(bodyData));
    if(err)return TE(err.message);
    if(data)return {data}
}
module.exports.insertT=insertT;
/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertW
Method getEmployee which is used to get  the 
Employee Details from the employee table through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 

const insertW=async function(bodyData){
    let[err,data]=await to(WorkStatus.create(bodyData));
    if(err)return TE(err.message);
    if(data)return {data}
}
module.exports.insertW=insertW;

/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertP
Method getEmployee which is used to get  the 
Employee Details from the employee table through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 
const insertP=async function(bodyData){
    let[err,data]=await to(Project.create(bodyData));
    if(err)return TE(err.message);
    if(data)return {data}
}
module.exports.insertP=insertP;

/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: insertPTM
Method getEmployee which is used to get  the 
Employee Details from the employee table through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 
const insertPTM=async function(bodyData){
    let[err,data]=await to(ProjectTaskMapping.create(bodyData));
    if(err)return TE(err.message);
    if(data)return {data}
}
module.exports.insertPTM=insertPTM;
/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: getWorkStatus
Method getEmployee which is used to get  the 
Employee Details from the employee table through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 
// const getWorkStatus=async function(bodyData){
//     let[err,data]=await to(WorkStatus.findOne(
//        { where:{
//                 id:bodyData
//         }
//     }
//     ));
//     console.log();
//     if(err)return TE(err.message)
//     if(data)return {data}
// }
const getWorkStatus=async function(bodyData){
    
    let[err,data]=await to(WorkStatus.findOne(
       { where:{
                id:bodyData,
                isDeleted:false
        }
    }
    ));
    if(err)return TE(err.message)
    return {data}
    // if(data){
    //     return {data}
    // }
    // else{
    //     return {data}
    // }
    // console.log(data.dataValues.isDeleted);

    // if(data?.dataValues?.isDeleted===true){
    //     console.log("hello its stanish here");
    //     let status={
    //         currentStatus:"The Data has been deleted"
    //     }
    //     return {status }
    // }else{
    //     return{data}
    // }
   
            
}
module.exports.getWorkStatus=getWorkStatus;
/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: updateWorkDetails
Method getEmployee which is used to get  the 
Employee Details from the employee table through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 
const updateWorkDetails=async function(bodyData){

    let[err,data]=await to(WorkStatus.update(


       { workDescription:bodyData.workDescription},{
        where:{
            id:bodyData.id
        }
       }
       ));
    
    if(err)return TE(err.message)
    if(data)return {data}
}
module.exports.updateWorkDetails=updateWorkDetails;
/** 
Original Author:Antilin Stanis
Author: Antilin Stanis
Created On:22/05/2023
Modified On:22/05/2023
Function: deleteWorkDetails
Method getEmployee which is used to get  the 
Employee Details from the employee table through payload.
@param {*} data it hold all the details about requested id
@returns if data fetched then return else run null or error message
*/ 
const deleteWorkDetails=async function(bodyData){

    let[err,data]=await to(WorkStatus.update(


       {isDeleted:true},{
        where:{
           id:bodyData.id
        }
       }
       ));
    
    if(err)return TE(err.message)
    if(data)return {data}
}
module.exports.deleteWorkDetails=deleteWorkDetails;

const includeT =async function(){
    let[err,data]=await to(Project.findAll({
        include:{
            model:ProjectTaskMapping
        }
    }))
    if(err)return TE(err.message);
    if(data)return {data}
}
module.exports.includeT=includeT;