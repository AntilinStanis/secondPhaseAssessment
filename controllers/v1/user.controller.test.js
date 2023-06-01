const Project=require('./../../models').project;
const ProjectTaskMapping=require('./../../models').projectTaskMapping;
const Task=require('./../../models').task;
const User=require('./../../models').user;
const WorkStatus=require('./../../models').workStatus;
const userController=require('./user.controller');
const add=require('../../add');
require('./../../global_functions');
const mockRequest=()=>{
    const req={};
    req.body=jest.fn().mockReturnValue(req);
    req.params=jest.fn().mockReturnValue(req);
    return req;
}

const mockResponse=()=>{
    const res={};
    res.send=jest.fn().mockReturnValue(res);
    res.status=jest.fn().mockReturnValue(res);
    res.json=jest.fn().mockReturnValue(res);
    return res;
}

jest.setTimeout(100000);
describe('User Controller', ()=>{
    test('insertUser',async ( )=>{
        let req= mockRequest();
        let res=mockResponse();
        req.body={
            
                "id":4,
                "firstName":"Bino",
                "lastName":"Bense",
                "emailId":"bino@gmail.com",
                "isDeleted":false
            
            
        }
        User.create=jest.fn()
        .mockRejectedValueOnce(new Error("Error"))
        .mockResolvedValue(Promise.resolve({
            "data": {
                "id": 4,
                "firstName": "Asha",
                "lastName": "Lax",
                "emailId": "ashalax@gmail.com",
                "isDeleted": false,
                "updatedAt": "2023-05-22T09:36:06.577Z",
                "createdAt": "2023-05-22T09:36:06.577Z"
            },
            "success": true
        }))
       await userController.insertUser(req,res);
       expect(res.statusCode).toBe(422);
       await userController.insertUser(req,res);
       expect(res.statusCode).toBe(200); 
    })
  

    
        test('insertTask',async ( )=>{
            let req= mockRequest();
            let res=mockResponse();
            req.body={
                "name":"task6",
                "isDeleted":false
            }
            Task.create=jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValue(Promise.resolve({
                "data": {
                    "id": 6,
                    "name": "task6",
                    "isDeleted": false,
                    "updatedAt": "2023-05-22T09:43:37.411Z",
                    "createdAt": "2023-05-22T09:43:37.411Z"
                },
                "success": true
            }))
           await userController.insertTask(req,res);
           expect(res.statusCode).toBe(422);
           await userController.insertTask(req,res);
           expect(res.statusCode).toBe(200); 
        })
        test('insertWorkStatus',async ( )=>{
            let req= mockRequest();
            let res=mockResponse();
            req.body={
                "userId":4,
                "projectTaskMappingId":["1", "3"],
                "fromTime":"09:00",
                "toTime":"20:00",
                "workDescription":"QA automation",
                "isDeleted":false
             
             }
            WorkStatus.create=jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValue(Promise.resolve({
                "data": {
                    "id": 4,
                    "userId": 4,
                    "projectTaskMappingId": [
                        1,
                        3
                    ],
                    "fromTime": "09:00:00",
                    "toTime": "20:00:00",
                    "workDescription": "QA automation",
                    "isDeleted": false,
                    "updatedAt": "2023-05-22T09:38:29.195Z",
                    "createdAt": "2023-05-22T09:38:29.195Z"
                },
                "success": true
            }))
           await userController.insertWorkStatus(req,res);
           expect(res.statusCode).toBe(422);
           await userController.insertWorkStatus(req,res);
           expect(res.statusCode).toBe(200); 
        })
        test('insertProjectTaskMapping',async ( )=>{
            let req= mockRequest();
            let res=mockResponse();
            req.body={
                "projectId":"1",
                "taskId":"4",
                "isDeleted":false
            }
            ProjectTaskMapping.create=jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValue(Promise.resolve({
                "data": {
                    "id": 7,
                    "projectId": 1,
                    "taskId": 4,
                    "isDeleted": false
                },
                "success": true
            }))
           await userController.insertProjectTaskMapping(req,res);
           expect(res.statusCode).toBe(422);
           await userController.insertProjectTaskMapping(req,res);
           expect(res.statusCode).toBe(200); 
        })
        test('insertProject',async ( )=>{
            let req= mockRequest();
            let res=mockResponse();
            req.body={
                "name":"zenyo payrole",
                "description":"payrole application",
                "isDeleted":false
            }
         Project.create=jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValue(Promise.resolve({
                "data": {
                    "id": 3,
                    "name": "zenyo payrole",
                    "description": "payrole application",
                    "isDeleted": false,
                    "updatedAt": "2023-05-22T09:48:56.008Z",
                    "createdAt": "2023-05-22T09:48:56.008Z"
                },
                "success": true
            }))
           await userController.insertProject(req,res);
           expect(res.statusCode).toBe(422);
           await userController.insertProject(req,res);
           expect(res.statusCode).toBe(200); 
        })
        test('getWorkstatus ',async ( )=>{
            let req= mockRequest();
            let res=mockResponse();
            req.params.id=1
         WorkStatus.findOne=jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValueOnce(Promise.resolve(
                {
                    "data": {
                        "id": 1,
                        "userId": 1,
                        "projectTaskMappingId": [
                            1,
                            2,
                            3
                        ],
                        "fromTime": "09:30:00",
                        "toTime": "19:00:00",
                        "workDescription": "Testing the zenbasket code",
                        "isDeleted": true,
                        "createdAt": "2023-05-22T09:36:54.494Z",
                        "updatedAt": "2023-05-22T10:26:59.255Z"
                    },
                    "success": true
                }
            ))
          
           await userController.getWorkStatus(req,res);
           expect(res.statusCode).toBe(422);
           await userController.getWorkStatus(req,res);
           expect(res.statusCode).toBe(200); 

        })

        test('updateWorkstatus',async ( )=>{
            let req= mockRequest();
            let res=mockResponse();
            req.body={
                "workDescription":"Testing the payroll code",
                "id":2
            }
         WorkStatus.update=jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValue(Promise.resolve(
                {
                    "data": [
                        1
                    ],
                    "success": true
                }
            ))
           await userController.updateWorkStatus(req,res);
           expect(res.statusCode).toBe(422);
           await userController.updateWorkStatus(req,res);
           expect(res.statusCode).toBe(200); 
        })
        test('deleteWorkstatus',async ( )=>{
            let req= mockRequest();
            let res=mockResponse();
            req.body={
                "id":1
            }
         WorkStatus.update=jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValue(Promise.resolve(
                {
                    "data": [
                        1
                    ],
                    "success": true
                }
            ))
           await userController.deleteWorkStatus(req,res);
           expect(res.statusCode).toBe(422);
           await userController.deleteWorkStatus(req,res);
           expect(res.statusCode).toBe(200); 
        })
})
