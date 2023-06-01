module.exports = (Sequelize,Datatypes) => {
    let project = Sequelize.define(
        "project",
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
                        description:{
                            type:Datatypes.STRING,
                            allowNull:false
                        },
                       isDeleted:{
                            type:Datatypes.BOOLEAN,
                            allowNull:false
                        }
        },
        {
                    tableName:'project',schema:'user',
                    timestamps:true
        }
    );
    project.association = (models) => {
        project.hasMany(models.projectTaskMapping, { foreignKey: "projectId" });
    };
    return project;
};