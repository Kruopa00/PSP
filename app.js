const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const errorHandler = require('./helpers/error-handler');


app.use(cors());
app.options('*', cors())

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

// Routes
const ordersRoutes = require('./routers/orders');
const productsRoutes = require('./routers/products');
const servicesRoutes = require('./routers/services');
const customersRoutes = require('./routers/customers');
const rewardsRoutes = require('./routers/loyaltyRewards');
const discountsRoutes = require('./routers/discounts');
const giftCardsRoutes = require('./routers/giftCards');
const taxSettingsRoutes = require('./routers/taxSettings');

const api = process.env.API_URL;

app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/services`, servicesRoutes);
app.use(`${api}/customers`, customersRoutes);
app.use(`${api}/loyaltyRewards`, rewardsRoutes);
app.use(`${api}/discounts`, discountsRoutes);
app.use(`${api}/giftCards`, giftCardsRoutes);
app.use(`${api}/taxSettings`, taxSettingsRoutes);

// Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'psp-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})


// Server
//app.listen(3000);

// Production
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port)
})