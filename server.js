const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => console.log('DB connection successful!'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
