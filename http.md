# HTTP

Exemplo simples de server HTTP:

````
const http = require('http');

const server = http.createServer(function (req, res){
    console.log(req);
});

server.listen(3000);
````

**Enquanto o node tiver um eventListener ele mantenerá o servidor escutando por eventos. caso não haja mais eventListeners no servidor este é para automáticamente**

## response
É a resposta de uma requisição http(no caso)

````
const http = require('http');
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first node.js server from scratch</title></head>')
    res.write('<body><h1>Hello folks!</h1></body>');
    res.write('</html>');
    res.end();

const server = http.createServer(function (req, res){
});

server.listen(3000);
````

**res.end() - é importante pois não fica aguardando nada so servidor enviando assim a resposta para o usuário. Não é possível escrever nada depois disso para que seja exibido na página**

### Buffers & Streams
Como funciona o buffer:
Carrega uma parte do arquivo e vai parseando em pequenas partes, disponibilizando conforme vai carregando.

````
...
if(url === '/message' && method === 'POST'){
    const body = [];

    req.on('data', chunk => {
        body.push(chunk);
    });

    req.on('end', ()=> {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFileSync('message.txt', message);
    })

    
    res.statusCode =  302;
    res.setHeader('Location', '/');
    return res.end();
}
...
````

## Static Folder
Usando express para servir arquivos estáticos.

````
import path from 'path';
import express from 'express';

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

...
````

podem existir multiplos pastas estaticas.