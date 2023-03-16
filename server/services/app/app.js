if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  }

const cors = require('cors')
const express = require('express');
const  errorHandler  = require('./middlewares/errorHandler');
const app = express()
const port = process.env.PORT || 4002
app.use(cors())
const routes = require('./routes/index');


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(routes)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


