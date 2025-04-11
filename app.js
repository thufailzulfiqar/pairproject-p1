const express = require('express')
const session = require('express-session')
const app = express()
const port = 3333


app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,  
        sameSite: true
     }
  }))

app.use('/', require('./routers') )


app.listen(port, () => {
  console.log(`Beli Cireng ${port} dapet 3`)
})