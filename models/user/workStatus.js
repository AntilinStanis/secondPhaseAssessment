module.exports=(Sequelize,Datatypes)=>{
    const workStatus=Sequelize.define('workStatus',{
        id:{
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        userId:{
            type:Datatypes.INTEGER,
            allowNull:false
        },
        projectTaskMappingId:{
            type:Datatypes.ARRAY(Datatypes.INTEGER),
            allowNull:false
        },
        fromTime:{
           type:Datatypes.TIME,
           allowNull:false
        },
        toTime:{
          type:Datatypes.TIME,
          allowNull:false
        },
        workDescription:{
           type:Datatypes.STRING,
           allowNUll:false
        },
        isDeleted:{
            type:Datatypes.BOOLEAN,
            allowNull:false
        }
        
    },
    {
        tableName:'workStatus',schema:'user',
        timestamps:true
    })
   
    return workStatus;
}