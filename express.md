# Express

Express é um framework que gerencia as resquisições, de forma simplificada para que o programador possa focar na lógica da aplicação.
faz essa captura das requisições através de middlewares.

## metodo use()
Captura todas as requisições, POST, GET, DELETE, PUT, PTCH e etc...
Existem 4 overloads.

1. Este método adiciona um middleware ao gerenciador de requisições do Express:
passa-se uma função com os argumentos requisição, resposta e prosseguir ( req, res, next )
o parametro next, é uma função que diz ao middleware passar para o próximo, caso haja ou finalizar.
**A ordem de execução dos middlewares é na ordem escritá no arquivo, de cima para baixo.**

````
...
const app = express();

app.use(
    (req, res, next)=>{
        console.log('In the middleware 1');
        next();
    }
);
app.use(
    (req, res, next)=>{
        console.log('In the middleware 2');
    }
);

const server = http.createServer(app);
server.listen(3000);
````

2. Adiciona um path e uma função de callback. Neste caso todo o path que iciniar com (/) irá retornar a resposta com o Titulo 'Hello from express';
**Essa rota deve ser colocada com última visto que as demais também terão (/) no nome**

````
...
const app = express();

app.use(
        '/teste',
    (req, res, next)=>{
        res.send('<h1>Hello from express path teste</h1>')
    }
);

app.use(
    '/',
    (req, res, next)=>{
        res.send('<h1>Hello from express path root</h1>')
    }
);

const server = http.createServer(app);
server.listen(3000);
````

### metodo res.send()
Envia uma resposta e seta o content-type automaticamente dependendo do que é enviado

No exemplo abaixo, irá setar o content-type para text/html automáticamente.

````
...
app.use(
    '/',
    (req, res, next)=>{
        res.send('<h1>Hello from express path root</h1>')
    }
);
...
````

### Parseando requisições
O express não parseia o body das requisições.
necessário installar outra lib chamada body-parser 
`npm install --save body-parser`;

criar um middleware no express para ele:
`app.use(bodyParser.urlencoded({extended: false}));`

e chamar `req.body` na rota que você deseja capturar o corpo da requisiçâo ou resposta

````
...
import bodyParser from 'body-parser';
...

app.use(bodyParser.urlencoded({extended: false}));

...
app.use(
    '/add-product',
    (req, res, next)=>{
        res.send('<form action="product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
    }
);

app.use(
    '/product',
    (req, res, next)=>{
        console.log(req.body)
        res.redirect('/')
    }
);

````

## metodos get(), post(), put(), patch(), delete()
Funciona como o use(), mas só para requisições do tipo especificado, além de testarem o path exato,
ou seja, mesmo que a rota get('/', ()=>{...}) venha primeiro que get('/teste', ()=>{...}),
se navegarmos para '/teste' ele nos direcionará para a página certa.
ou seja se tentar fazer um post num path setado como get, não funcionará.


## Rotas com express.Router()

TODO: mostrar o router do express e filtrando as todas