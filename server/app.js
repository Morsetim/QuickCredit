import express from 'express';
import bodyParser from 'body-parser';
import apiRoute from './routes/router';


const app = express();
const port = parseInt((process.env.PORT), 10) || 4000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) =>{
    res.send({
        message: "Welcome to QuickCredit App"
    });
})

app.use('/api/v1', apiRoute);
app.use('*', (req, res) => {
    res.status(404);
    res.json({
      status: 'Failed',
      message: 'Page not found'
    });
  });

app.listen(port, ()=>{console.log(`Application listening at port ${port}`);});



export default app;