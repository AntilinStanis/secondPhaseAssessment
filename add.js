// function add(a,b){
//     let c= a+b
//     console.log(c);
//     return a+b
// }
// // add(5,4);
// module.exports.add=add;

function display(){
    const text = '{"name":"John", "birth":"1986-12-14", "city":"New York"}';
    const obj = JSON.parse(text);
    console.log(obj);
}
display();