import fs from 'fs';

export const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>My first node.js server from scratch</title></head>')
        res.write('<body><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Enviar</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        const body = [];

        req.on('data', chunk => {
            console.log('chunk: ',chunk);
            body.push(chunk);
        });

        req.on('end', ()=> {
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsed: ', parsedBody);
            const message = parsedBody.split('=')[0];
            fs.writeFile('message.txt', message, error =>{
                res.statusCode =  302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
}