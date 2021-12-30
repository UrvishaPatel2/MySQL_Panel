const express = require('express');
const app = express();
const path = require('path');
const db = require('./app/middleware/db');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();

const routes = require('./app/routes/userRouters')
const contactRoutes = require('./app/routes/contactRoutes');
const categoryRoutes = require('./app/routes/categoryRoutes');
const testRoutes = require('./app/routes/testRoutes');
const portfolioRoutes = require('./app/routes/portfolioRoutes');

const bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/',routes);
app.use('/',contactRoutes);
app.use('/',categoryRoutes);
app.use('/',testRoutes);
app.use('/',portfolioRoutes);

app.use(express.static("app/uploads"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
