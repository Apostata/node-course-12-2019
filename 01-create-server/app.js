import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) =>{
    
    const url = req.url;
    const method = req.method;

    // rotas
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>My first node.js server from scratch</title></head>')
        res.write('<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Enviar</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    
    if(url === '/message' && method === 'POST'){
        fs.writeFileSync('message.txt', 'Oples!');
        res.statusCode =  302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first node.js server from scratch</title></head>')
    res.write('<body><h1>Hello folks!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);