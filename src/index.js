import Express from 'express';

import dotenv from 'dotenv';
dotenv.config();

const app = new Express();

app.use(Express.json());

app.get('/v1.0.0/testing', (req, res) => {
  res.send('hello world');
});

app.listen(process.env.APP_PORT, () => {
  console.log(`server is running on port ${process.env.APP_PORT}`);
});
