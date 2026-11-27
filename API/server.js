const http = require('http');

// Ir buscar os dados ao data.js
const { categories, colorOptions, sizeOptions, styleOptions, dresses } = require('./data.js');

const server = http.createServer((req, res) => {
  // CORS: deixa o React (porta 3000) pedir dados a esta API
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/dresses') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dresses));
  } else if (req.url === '/categories') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(categories));
  } else if (req.url === '/colorOptions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(colorOptions));
  } else if (req.url === '/sizeOptions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(sizeOptions));
  } else if (req.url === '/styleOptions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(styleOptions));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

server.listen(4000, () => {
  console.log('Servidor a correr em http://localhost:4000');
});