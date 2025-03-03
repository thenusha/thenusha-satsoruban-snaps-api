import express from 'express';
import cors from "cors";
import tagRoute from './routes/tags.js';
import "dotenv/config";
import photoRoute from './routes/photos.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 8081;

app.use('/tags', tagRoute);
app.use('/photos', photoRoute);

app.get('/', function(req, res){
    res.send('Welome to my server :)');
});

app.listen(PORT, function(){
    console.log('Hello world, server port 8080');
});