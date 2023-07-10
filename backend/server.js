require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const shopRoutes = require('./routes/shopRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes')
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require("cors")
const path = require("path");  

const app = express();

app.use(cors());
app.use(express.json());
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})
app.use(errorHandler);
app.use("/images", express.static(path.join(__dirname,"images")));  

app.use('/api/shop',shopRoutes);
app.use('/api/user',userRoutes);
app.use('/api/cart',cartRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen to requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening to port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })




