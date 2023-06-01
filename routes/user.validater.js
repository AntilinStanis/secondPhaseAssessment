const {check,body,param,query}=require('express-validator');
const  userValidator={
    createUser:[
        body('firstName').isString().trim().notEmpty().withMessage('First Name is Invalid '),
        body('lastName').isString().notEmpty().withMessage('Last Name is Invalid'),
        body('emailId').isEmail().withMessage('should be an email'),
        body('isDeleted').isBoolean().withMessage("isDeleted column should be boolean")
        
    ]
}
module.exports.userValidator = userValidator;
const  taskValidator={
    createTask:[
      
        body('name').isString().notEmpty().withMessage(' name is Invalid'),
        body('isDeleted').isBoolean().withMessage('should not be Boolean values')
        
    ]
}
module.exports.taskValidator = taskValidator;
const  projectValidator={
    createProject:[
      
        body('name').isString().notEmpty().withMessage(' name is Invalid'),
        body('description').isString().withMessage('description should be String'),
        body('isDeleted').isBoolean().withMessage('should not be Boolean values')
        
    ]
}
module.exports.projectValidator = projectValidator;
const  projectTaskMappingValidator={
    createProjectTaskMapping:[
      
        body('projectId').isInt().withMessage('project id is Invalid '),
        body('taskId').isInt().withMessage('task id is Invalid '),
        body('isDeleted').isBoolean().withMessage('should not be Boolean values')
        
    ]
}
module.exports.projectTaskMappingValidator = projectTaskMappingValidator;
const workStatusValidator={
    createWorkStatus:[
       
        body('userId').isInt().withMessage('project id is Invalid '),
        body('isDeleted').isBoolean().withMessage('should not be Boolean values'),
        body('workDescription').isString().withMessage('work description should be string')
        
        
    ]
}
module.exports.workStatusValidator = workStatusValidator;
