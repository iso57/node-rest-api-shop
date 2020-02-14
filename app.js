var express =  require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connection = mongoose.connect('*** YOUR URI ***',{
    useNewUrlParser: true,
    useUnifiedTopology:true
});
connection.then(result => {
    if(result)
    {
        console.log('Connected to MongoDB Database.');
    }
}).catch(err => {
   console.log('Login failed to MongoDB Database, error: '+ err);
});

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

   if (req.method === "OPTIONS")
   {
       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
       return res.status(200).json({});
   }
   next();
});

app.use('/products',productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);

    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

module.exports = app;
