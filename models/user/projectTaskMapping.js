module.exports=(Sequelize,Datatypes)=>{
    const projectTaskMapping=Sequelize.define('projectTaskMapping',{
        id:{
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        isDeleted:{
            type:Datatypes.BOOLEAN,
            allowNull:false
        }
        
    },
    {
        tableName:'projectTaskMapping',schema:'user'
    });
    projectTaskMapping.association=function(models){
        projectTaskMapping.projectId=this.belongsTo(models.project,{foreignKey:'projectId'}),
        projectTaskMapping.taskId=this.belongsTo(models.task,{foreignKey:'taskId'})
    }
    return projectTaskMapping;
}