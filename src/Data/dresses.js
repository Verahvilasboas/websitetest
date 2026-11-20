
export const categories = [
  { id: 'all', label: 'View all' },
  { id: 'midi', label: 'Midi | Maxi' },
  { id: 'mini', label: 'Mini' },
  { id: 'jumpsuit', label: 'Jumpsuits' },
  { id: 'satin', label: 'Satin' },
  { id: 'second', label: 'Second hand' },
];

// cores disponíveis no painel de filtros
export const colorOptions = [
  { name: 'Beige', hex: '#c9b9a3' },
  { name: 'Black', hex: '#111111' },
  { name: 'Brown', hex: '#8a4a1f' },
  { name: 'Burgundy', hex: '#7a1420' },
  { name: 'Charcoal', hex: '#3b3b3b' },
  { name: 'Chocolate', hex: '#3d2a20' },
  { name: 'Grey', hex: '#5c5c5c' },
  { name: 'Red', hex: '#e60e0e' },
];



export const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const styleOptions = ['Basic', 'Party', 'Knitwear'];
//colocar apenas nome de cores
export const dresses = [
  { id: 1, name: 'Dress paris', price: 100, stock: 8, isNew: true, categories: ['midi', 'satin'], sizes: ['XS','S','M'], style: 'Party', colors: ['Magenta', 'Black'], image: '/images/paris1.jpg', bg: 'black'},
  { id: 2, name: 'Dress london', price: 200, stock: 2, isNew: false, categories: ['mini'], sizes: ['S','M','L','XL'], style: 'Basic', colors: ['#111111', '#3b3b3b'], image: '/images/london.jpg', bg: '#1d1d1d' },
  { id: 4, name: 'Dress tokyo', price: 400, stock: 1, isNew: false, categories: ['jumpsuit'], sizes: ['XS','S'], style: 'Party', colors: ['#c9b9a3', '#111111'], image: '/images/tokyo.jpg', bg: '#c9b9a3'},
  { id: 5, name: 'Dress dubai', price: 500, stock: 10, isNew: true, categories: ['midi', 'satin'], sizes: ['S','M','L','XL','XXL'], style: 'Party', colors: ['#c9b9a3', '#7a1420'], image: '/images/dubai.jpg', bg: '#c9b9a3' },
  { id: 6, name: 'Dress milano', price: 150, stock: 3, isNew: false, categories: ['mini', 'second'], sizes: ['M','L','XL'], style: 'Knitwear', colors: ['#c9b9a3', '#111111'], image: '/images/milano.jpg', bg: '#c9b9a3'},
  { id: 7, name: 'Dress lisboa', price: 250, stock: 7, isNew: true, categories: ['midi'], sizes: ['XS','S','M','L'], style: 'Basic', colors: ['#7a8067', '#111111'], image: '/images/lisbon.jpg', bg: '#c867bd' },
  { id: 8, name: 'Dress porto', price: 120, stock: 2, isNew: false, categories: ['mini', 'satin', 'second'], sizes: ['S'], style: 'Knitwear', colors: ['#2b0616'], image: '/images/porto.jpg', bg: '#4a3326' },
  { id: 9, name: 'Dress brasilia', price: 200, stock: 5, isNew: false, categories: ['mini', 'satin', 'second'], sizes: ['S'], style: 'Knitwear', colors: ['rgb(49, 32, 61)'], image: '/images/brasilia.jpg', bg: '#4a3326' },
  { id: 10, name: 'Dress roma', price: 120, stock: 2, isNew: false, categories: ['mini', 'satin'], sizes: ['S'], style: 'Knitwear', colors: ['#3d2a20'], image: '/images/roma.jpg', bg: '#4a3326' },
  { id: 11, name: 'Dress madrid', price: 500, stock: 2, isNew: false, categories: ['mini', 'satin'], sizes: ['S'], style: 'Knitwear', colors: ['#3d2a20'], image: '/images/madrid.jpg', bg: '#4a3326' },
  { id: 12, name: 'Dress new york', price: 300, stock: 6, isNew: true, categories: ['midi'], sizes: ['M','L'], style: 'Basic', colors: ['#8a4a1f', '#111111', '#c9b9a3'], image: '/images/newyork.jpg', bg: '#9a5626' },
];

// next Task
// criar um API database em javascript, sem ser em react. - servidor, respondo ao pedido html 
