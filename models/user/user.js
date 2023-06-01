module.exports=(Sequelize,Datatypes)=>{
    const user=Sequelize.define('user',{
        id:{
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        firstName:{
            type:Datatypes.STRING,
            allowNull:false
        },
        lastName:{
            type:Datatypes.STRING,
            allowNull:false
        },
       emailId:{
            type:Datatypes.STRING,
            allowNull:false
        },
        isDeleted:{
            type:Datatypes.BOOLEAN,
            allowNull:false
        }
        
    },
    {
        tableName:'user',schema:'user',
        timestamps:true
    })
    return user;
}