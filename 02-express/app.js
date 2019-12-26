import express from 'express';
import path  from 'path';
import bodyParser from 'body-parser';

import AdminRoutes from './routes/admin';
import ClientRoutes from './routes/shop';

const PATH = path.join(__dirname,'views', '404.html');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
/*
Captura a requisição do favicon e retorna "No content"
Fazendo com que pare de aparecer uma requisção extra no console
*/
app.get('/favicon.ico', (req, res) => res.status(204));
app.use(ClientRoutes);
// filtered path with /admin
app.use('/admin',AdminRoutes);
//para tratar 404
app.use((req, res)=>{
    res.status(404).sendFile(PATH);
})

app.listen(3000);