require('../../../global_functions');
const Project=require('./../../models').project;
const ProjectTaskMapping=require('./../../models').projectTaskMapping;
const Task=require('./../../models').task;
const User=require('./../../models').user;
const WorkStatus=require('./../../models').workStatus;
const userService= require('./user.service');

jest.setTimeout(50000);
describe('UserService', () => {

    beforeEach(async () => {
      
        jest.restoreAllMocks();
    })

    test('insertU', async () => {
      User.create= jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValueOnce(Promise.resolve({ success: true }));
        try {
            await userService.insertU();
        }
        catch (err) {
            expect(err.message).toBe("Error");
        }
        await userService.insertU();


    });
    test('insertT', async () => {
        Task.create= jest.fn()
              .mockRejectedValueOnce(new Error("Error"))
              .mockResolvedValueOnce(Promise.resolve({ success: true }));
          try {
              await userService.insertT();
          }
          catch (err) {
              expect(err.message).toBe("Error");
          }
          await userService.insertT();
  
  
      });
      test('insertP', async () => {
        Task.create= jest.fn()
              .mockRejectedValueOnce(new Error("Error"))
              .mockResolvedValueOnce(Promise.resolve({ success: true }));
          try {
              await userService.insertP();
          }
          catch (err) {
              expect(err.message).toBe("Error");
          }
          await userService.insertP();
  
  
      });
      test('insertW', async () => {
        WorkStatus.create= jest.fn()
              .mockRejectedValueOnce(new Error("Error"))
              .mockResolvedValueOnce(Promise.resolve({ success: true }));
          try {
              await userService.insertW();
          }
          catch (err) {
              expect(err.message).toBe("Error");
          }
          await userService.insertW();
  
  
      });
      test('insertP', async () => {
        Project.create= jest.fn()
              .mockRejectedValueOnce(new Error("Error"))
              .mockResolvedValueOnce(Promise.resolve({ success: true }));
          try {
              await userService.insertP();
          }
          catch (err) {
              expect(err.message).toBe("Error");
          }
          await userService.insertP();
  
  
      });
     test('deleteRole', async () => {
        Role.update = jest.fn()
            .mockRejectedValueOnce(new Error("Error"))
            .mockResolvedValueOnce(Promise.resolve({ success: true }));
        try {
            await settingsService.deleteR();
        }
        catch (err) {
            expect(err.message).toBe("Error");
        }
        await settingsService.deleteR();


    });
})