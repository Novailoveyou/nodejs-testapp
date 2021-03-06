const { RSA_NO_PADDING } = require('constants')
const http = require('http')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('./controllers/itemController')

const server = http.createServer((req, res) => {

   // res.statusCode = 200
  // res.setHeader('Content-Type', 'text/html')
  // res.write('<h1>Hello World</h1>')
  // res.end()

  if((req.url === '/api/items' || req.url === '/api/items/') && req.method === 'GET'){
    // res.header("Access-Control-Allow-Origin", "*")
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    // console.log(res.connection({routes: {cors: true}}));
    // console.log(res.connection);
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    getItems(req, res)
  }else if(req.url.match(/\/api\/items\/([0-9]+)/) && req.method === 'GET'){
    const id = req.url.split('/')[3]
    getItem(req, res, id)
  }
  // else if(req.url === '/api/items' || req.url === '/api/items/' && req.method === 'POST'){
  //   createItem(req, res)
  // }else if(req.url.match(/\/api\/items\/([0-9]+)/) && req.method === 'PUT'){
  //   const id = req.url.split('/')[3]
  //   updateItem(req,res, id)
  // }else if(req.url.match(/\/api\/items\/([0-9]+)/) && req.method === 'DELETE'){
  //   const id = req.url.split('/')[3]
  //   deleteItem(req,res, id)
  // }
  else if(req.url.includes('/.well-known') && req.method === 'GET'){
    const id = req.url.split('/')[3]
    res.statusCode = 200
    res.end(id)
  }else{
    res.writeHead(404, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify({ message: 'Route Not Found'}))
  }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server's running on port ${PORT}`))