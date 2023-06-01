// module.exports=(Sequelize,Datatypes)=>{
//     const Model=Sequelize.define('task',{
//         id:{
//             type:Datatypes.INTEGER,
//             primaryKey:true,
//             autoIncrement:true,
//             allowNull:false
//         },
//         name:{
//             type:Datatypes.STRING,
//             allowNull:false
//         },
//        isDeleted:{
//             type:Datatypes.BOOLEAN,
//             allowNull:false
//         }
        
//     },
//     {
//         tableName:'task',schema:'user',
//         timeStamps:true
//     })
//     Model.associate=function(models){
//         // this.projectTaskMapping=
//         Model.hasMany(models.projectTaskMapping,{foreignKey:'taskId'}),
       
//        }
//     return Model;
// }

module.exports = (Sequelize,Datatypes) => {
    let task = Sequelize.define(
        "task",
        {
            id:{
                            type:Datatypes.INTEGER,
                            primaryKey:true,
                            autoIncrement:true,
                            allowNull:false
                        },
                        name:{
                            type:Datatypes.STRING,
                            allowNull:false
                        },
                       isDeleted:{
                            type:Datatypes.BOOLEAN,
                            allowNull:false
                        }
        },
        {
                    tableName:'task',schema:'user',
                    timestamps:true
        }
    );
    task.association = (models) => {
        task.hasMany(models.projectTaskMapping, { foreignKey: "taskId" });
    };
    return task;
};