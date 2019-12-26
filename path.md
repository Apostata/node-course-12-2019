# Path

Um módulo nativo do node para navegação entre pastas do diretório.

## path.join()
Junta as strings para formar uma path para um arquivo.
exemplo para apontar para um arquivo html:

````
const PATH = path.join(__dirname, '..' ,'views', 'add-product.html');

````

__dirname           : referencia a pasta de execução atual.
'..'                : pasta raiz.
'views'             : pasta raiz + pasta views.
'add-product.html'  : o arquivo em si.