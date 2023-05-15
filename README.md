# Instalacion

desgargar el repositorio

```bash
git clone git@github.com:jhon0210/PruebaMicroServicios.git 
```


## Crear el archivo de .env dentro los directorios event-bus, users, tasks, query y adicionar las siguiente variables de ambiente.

```bash
vscode .env

SECRET_TOKEN=[token secreto para generar JWT]
MONGODB_USER=[usuario de acceso a la base de datos]
MONGODB_PWD=[Contrasena creada en Mongo DB]
```


## Crear las siguientes bases de datos y sus colecciones en mongoDB.

![Base de datos](https://raw.githubusercontent.com/jhon0210/PruebaMicroServicios/main/docs/Base_de_datos.jpeg)


## Instalado paquetes en cada servicio.

Luego abrir una terminal por cada servicio y entrar cada directorio para ejecutar "npm i" y "npm start" para instalar los paquetes y ejecutar el servicio.

```bash
cd users
users$ npm i
users$ npm start

cd tasks
tasks$ npm i
tasks$ npm start

cd event-bus
event-bus$ npm i
event-bus$ npm start

cd client
client$ npm i
```

Para ejecutar el front end crear una terminal y ejecutar los siguientes comandos para arrancar el la interfaz de usuario.


```bash
cd client
client$ npm i
client$ npm run dev
```


## Interfaz TareApp

Primero realizar el registro de la app.

![Registro](https://github.com/jhon0210/PruebaMicroServicios/blob/main/docs/RegisterUser.jpeg)


Si el registro fue exitoso al app lo redireccionara al Inicio para autenticarse.

![Inicio](https://raw.githubusercontent.com/jhon0210/PruebaMicroServicios/main/docs/Login.jpeg)

Al autenticarse exitosamente la app lo enviara la pagina donde el usuario podra crear, editar y eliminar tareas.

![Menu](https://github.com/jhon0210/PruebaMicroServicios/blob/main/docs/MenuCrud.jpeg)
