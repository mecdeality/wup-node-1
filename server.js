const https = require('http')
const fs = require('fs')
// import http from 'http';
const port = 3000;
const hostname = '127.0.0.1';


const server = https.createServer((req, res) => {
  console.log('REQQ CREATED');
  res.setHeader('Content-Type', 'text/html');
  let path = './views';
  switch(req.url){
    case '/main':
      path += '/main.html';
      res.statusCode = 200;
      break;
    default:
      path += '/404.html';
      res.statusCode = 404
  }
  fs.readFile(path, (err, data) => {
    if(err) console.log(err)
    res.write(data);
    res.end()
  })
})

server.listen(port, hostname, () => {
  console.log('SERVER IS LISTENED');
})