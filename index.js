const express = require('express');

const Express = express;

const { config } = require('dotenv');

config();

// ============================================== Call Route From Route file ==================================================

// import UserAuthRoute from './src/Route/Testing';
const UserAuthRoute = require('./src/Route/Testing');
const ProductRoute = require('./src/Route/ProuductRoute');

//================================================= END CALL ROUTE =====================================================================

const app = new Express();

app.use(Express.json());

app.get('/v1.0.0/testing', (req, res) => {
  res.send('hello world');
});

// ================================================ Call Controller From Controller file ====================================================
app.use('/api/v1.0.0/auth', UserAuthRoute);
app.use('/api/v1.0.0/product', ProductRoute);

//  ============================================= END CALL CONTROLLER =====================================================================

app.listen(process.env.APP_PORT, () => {
  console.log(`server is running on port ${process.env.APP_PORT}`);
});
