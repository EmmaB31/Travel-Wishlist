const express = require('express');
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 8000;

app.use(bodyParser.json())
app.listen(port, () => console.log(`App listening on port ${port}`));

const wishlistRouter = require("./wishlistRouter")

app.use("/api/countries", wishlistRouter)
