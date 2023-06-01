const Add=require('./add');

test('Addtion',()=>{
    // userController.add(5,6);
 expect(Add.add(5,7)).toBe(12)
})