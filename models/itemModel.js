let items = require('../data/items')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

function findAll(){
  return new Promise((resolve, reject) => {
    resolve(items)
  })
}

function findById(id){
  return new Promise((resolve, reject) => {
    const item = items.find(item => item.id === id)
    resolve(item)
  })
}

function create(item){
  return new Promise((resolve, reject) => {
    const newItem = {id: uuidv4(), ...item}
    items.push(newItem)
    writeDataToFile('./data/items.json', items)
    resolve(newItem)
  })
}

function update(id, item){
  return new Promise((resolve, reject) => {
    const idx = items.findIndex(item => item.id === id)
    items[idx] = {id, ...item}
    writeDataToFile('./data/items.json', items)
    resolve(items[idx])
  })
}

function remove(id){
  return new Promise((resolve, reject) => {
    items = items.filter(item => item.id !== id)
    writeDataToFile('./data/items.json', items)
    resolve()
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
}