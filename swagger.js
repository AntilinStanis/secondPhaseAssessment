var swagger = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = {
    swaggerDefinition: {
        "securityDefinitions": {
            "basicAuth": {
                "description": '',
                "type": 'basic',
                "name": 'Authorization',
                "in": 'header',
            },
            "Bearer Authorization": {
                "description": 'Enter JWT Bearer token **_only_**',
                "type": 'apiKey',
                "name": 'Authorization',
                "in": 'header',
            }
        },
        "info": {
            "title": "Task Management Swagger",
            "description": "Task Management",
            "contact": {
                "email": "mailto:admin@centizen.com"
            },
            
            "consumes": [
                "application/json"
            ],
            "produces": [
                "application/json"
            ],
            "version": "1.0.0",
},
    },   
    apis: ['./swaggerDoc/User/*.yaml'],
}
const swaggerDoc = swaggerJSDoc(swaggerOptions);
app.use('/swagger', swagger.serve, swagger.setup(swaggerDoc));