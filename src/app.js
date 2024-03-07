
//Handlebars
const handlebars = require('handlebars');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io');
//express
const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
const passport = require('passport');
const { initPassport } = require('./config/passport.config');
const cookieParser = require('cookie-parser');

//routers
const routerProducts = require('./routes/products.router');
const sessionRouter = require('./routes/session.router');
const routerCarts = require('./routes/carts.router');
const routerViews = require('./routes/views.router');
const showMessage = require('./routes/message.router');
const chatRouter = require('./routes/chat.router');

//variables de ambientes
const { config } = require('./config/config')
//const PORT = 8080
//const PORT = config.general_config.PORT
const PORT = 3000
const DBNAME = config.database.DBNAME
const MONGO_URL = config.database.MONGO_URL

//app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
initPassport()
app.use(cookieParser())

app.use(passport.initialize())

//handlebars config
app.engine('handlebars', engine());

//setup view engine
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));


//Router config
app.use('/', routerViews)
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)
app.use('/api/sessions', sessionRouter)
app.use('/message', showMessage)
app.use('/api/chat', chatRouter)

async function dataBase() {
    try {
       
        await mongoose.connect(MONGO_URL,{dbName:DBNAME})//{dbName:'ecommerce'}
       
        console.log('DB online')
    } catch (error) {
        console.log(error.message)
    }
}
dataBase()
const server = app.listen(PORT, () => console.log("Server online port " + PORT))

const io = new Server(server)


let users = []
let menssageUsers = []
io.on('connection', socket => {
    console.log(`Cliente connected with ID ${socket.id}!!!`)

    socket.on('id', nombre => {
        users.push({ nombre, id: socket.id })
        socket.broadcast.emit('newUser', nombre)
        socket.emit("hello", menssageUsers)
    })

    socket.on('message', datos => {
        menssageUsers.push(datos)
        io.emit('newMessage', datos)

    })

    socket.on('disconnect', () => {
        let userDesc = users.find(u => u.id === socket.id)
        if (userDesc) {
            io.emit("userDesconnected", userDesc.nombre)
        }
    })
})


module.exports = { io }



