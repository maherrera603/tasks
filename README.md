# API TASK
La API de Gestión de Tareas es una solución RESTful diseñada para facilitar la gestión de tareas, administración de usuarios, y un sistema de autenticación seguro. Está organizada en tres módulos principales:

 - Auth
 - User
 - Task 

## Tecnologias
 - Express
 - TypeScript
 - Docker
 - MongoDb
 - Docker


## Instalacion
- Clonar .env.template a .env y configurar las variables de entorno
- Instalar dependencias ``` npm install ```
- En caso de necesitar base de datos, configurar docker-compose.yml y ejecutar ` docker-compose up ` para leventar los servicios
- Importar el archivo "documentacion_task_postman.json" en postman para realizar las pruebas necesarias
- Iniciar proyecto ``` npm run dev ```