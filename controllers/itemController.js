const Item = require('../models/itemModel')

const { getPostData } = require('../utils')

// @desc    Gets All Items
// @route   GET /api/items
async function getItems(req, res){
  try{
    const items = await Item.findAll()

    res.writeHead(200, { 'Content-Type' : 'application/json' })
    res.end(JSON.stringify(items))
  }catch(err){
    console.log(err)
  }
}

// @desc    Gets Single Item
// @route   GET /api/items/:id
async function getItem(req, res, id){
  try{
    const item = await Item.findById(id)

    if(!item){
      res.writeHead(404, { 'Content-Type' : 'application/json' })
      res.end(JSON.stringify({ message: 'Item Not Found'}))
    }else{
      res.writeHead(200, { 'Content-Type' : 'application/json' })
      res.end(JSON.stringify(item))
    }
  }catch(err){
    console.log(err)
  }
}

// @desc    Create an Item
// @route   POST /api/items
async function createItem(req, res){
  try{
    
    const body = await getPostData(req)

    const { title, description, price } = JSON.parse(body)

    const item = {
      title,
      description,
      price
    }

    const newItem = await Item.create(item)

    res.writeHead(201, { 'Content-Type' : 'applicationn/json' })
    return res.end(JSON.stringify(newItem))

    
  }catch(err){
    console.log(err)
  }
}

// @desc    Update an Item
// @route   PUT /api/items/:id
async function updateItem(req, res, id){
  try{
    
    const item = await Item.findById(id)

    if(!item){
      res.writeHead(404, { 'Content-Type' : 'application/json' })
      res.end(JSON.stringify({ message: 'Item Not Found'}))
    }else{
      const body = await getPostData(req)

      const { title, desc, price } = JSON.parse(body)
  
      const itemData = {
        title: title || item.title,
        desc: desc || item.desc,
        price: price || item.price
      }
  
      const updItem = await Item.update(id, itemData)
  
      res.writeHead(200, { 'Content-Type' : 'applicationn/json' })
      return res.end(JSON.stringify(updItem))
    }
  }catch(err){
    console.log(err)
  }
}

// @desc    Delete an Item
// @route   DELETE /api/items/:id
async function deleteItem(req, res, id){
  try{
    const item = await Item.findById(id)

    if(!item){
      res.writeHead(404, { 'Content-Type' : 'application/json' })
      res.end(JSON.stringify({ message: 'Item Not Found'}))
    }else{
      await Item.remove(id)
      res.writeHead(200, { 'Content-Type' : 'application/json' })
      res.end(JSON.stringify( {message: `Item ${id} removed`}))
    } 
  }catch(err){
    console.log(err)
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
}