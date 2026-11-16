

// just an experience with filter method

const items = [
  { id: 1, name: 'Dress paris', price: 100 },
  { id: 2, name: 'Dress london', price: 200 },
  { id: 3, name: 'Dress new york', price: 300 },
{ id: 4, name: 'Dress tokyo', price: 400 },
{ id: 5, name: 'Dress dubai', price: 500 },
];

const filterItems = items.filter((item) => {
return item.price <= 200

})

console.log(filterItems)
console.log(items)

const filterNames = items.map((item) => {
return item.name

})

console.log(filterNames)

const foundItem =  items.find((item) => {
  return item.name === 'Dress paris'
})

console.log(foundItem)

items.forEach((item) => {
  console.log(item.name)
})

const hasExpensiveItems = items.some((item) => {
  return item.price >= 200
})

console.log(hasExpensiveItems)