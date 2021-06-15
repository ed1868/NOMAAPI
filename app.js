const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })


const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const nocache = require('nocache')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const nodemailer = require("nodemailer");

require('./configs/database')

const app_name = require('./package.json').name
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
)

const app = express()

app.use(nocache())

// Set "Access-Control-Allow-Origin" header
// app.use(
//   cors({
//     origin: (origin, cb) => {
//       cb(null, process.env.NODE_ENV !== 'production')
//     },
//     optionsSuccessStatus: 200,
//   })
// )


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use(logger('dev'))


app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser())



// Set the public folder to "~/client/build/"
// Example: http://localhost:5000/favicon.ico => Display "~/client/build/favicon.ico"
app.use(express.static(path.join(__dirname, '../client/build')))

// Enable authentication using session + passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'NomadHwek',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)
require('./passport')(app)

app.use('/api', require('./routes/index'))
app.use('/api', require('./routes/auth'))
app.use('/api/countries', require('./routes/countries'))

app.use('/api/contact', require('./routes/contact'));

app.use('/api/tokenWaitList', require('./routes/tokenWishList'));

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
  res.json({
    secret: 42,
    user: "YA Girl",
  })
})

// For any other routes, redirect to the index.html file of React
// app.get('*', (req, res) => {
//   res.json({
//     secret: 42,
//     user: "YA Girl",
//   })
// })

// Error handler
app.use((err, req, res, next) => {
  console.error('----- An error happened -----')
  console.error(err)

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500)

    // A limited amount of information sent in production
    if (process.env.NODE_ENV === 'production') res.json(err)
    else
      res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))))
  }
})

module.exports = app
