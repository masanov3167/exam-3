const express = require('express');
const PORT = process.env.PORT || 8000;
const cors = require('cors')
const app = express();
const router = require('./route/routes');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())
app.use(router);
app.listen(PORT, console.log(PORT));