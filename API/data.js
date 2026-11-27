
0// Categorias do menu
const categories = [
  { id: 'all', label: 'View all' },
  { id: 'midi', label: 'Midi | Maxi' },
  { id: 'mini', label: 'Mini' },
  { id: 'jumpsuit', label: 'Jumpsuits' },
  { id: 'satin', label: 'Satin' },
  { id: 'second', label: 'Second hand' },
];

//1. paleta de cores

const ColorOptions = [
 { name: 'Beige', hex: '#c9b9a3' },
  { name: 'Black', hex: '#111111' },
  { name: 'Brown', hex: '#8a4a1f' },
  { name: 'Burgundy', hex: '#7a1420' },
  { name: 'Charcoal', hex: '#3b3b3b' },
  { name: 'Chocolate', hex: '#3d2a20' },
  { name: 'Grey', hex: '#5c5c5c' },
  { name: 'Red', hex: '#e60e0e' },
 { name: 'Silver', hex: '#898989' },
  { name: 'Olive', hex: '#7a8067' },
  { name: 'Wine', hex: '#2b0616' },
  { name: 'Plum', hex: '#31203d' },

]

//2. Colors
const COLORS = Object.fromEntries(
colorOptions.map((color) => [color.name.toUpperCase(), color.name])
);


const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const styleOptions = ['Basic', 'Party', 'Knitwear'];

//3. Os vestidos 
const dresses = [
  { id: 1, name: 'Dress paris', price: 100, stock: 8, isNew: true, categories: ['midi', 'satin'], sizes: ['XS', 'S', 'M'], style: 'Party', colors: [COLORS.BLACK, COLORS.RED], image: '/images/paris.jpg', bg: 'black' },
  { id: 2, name: 'Dress london', price: 200, stock: 2, isNew: false, categories: ['mini'], sizes: ['S', 'M', 'L', 'XL'], style: 'Basic', colors: [COLORS.BLACK, COLORS.SILVER], image: '/images/london.jpg', bg: '#1d1d1d' },
  { id: 4, name: 'Dress tokyo', price: 400, stock: 1, isNew: false, categories: ['jumpsuit'], sizes: ['XS', 'S'], style: 'Party', colors: [COLORS.BEIGE, COLORS.BLACK], image: '/images/tokyo.jpg', bg: '#c9b9a3' },
  { id: 5, name: 'Dress dubai', price: 500, stock: 10, isNew: true, categories: ['midi', 'satin'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], style: 'Party', colors: [COLORS.BEIGE, COLORS.BURGUNDY], image: '/images/dubai.jpg', bg: '#c9b9a3' },
  { id: 6, name: 'Dress milano', price: 150, stock: 3, isNew: false, categories: ['mini', 'second'], sizes: ['M', 'L', 'XL'], style: 'Knitwear', colors: [COLORS.BEIGE, COLORS.BLACK], image: '/images/milano.jpg', bg: '#c9b9a3' },
  { id: 7, name: 'Dress lisboa', price: 250, stock: 7, isNew: true, categories: ['midi'], sizes: ['XS', 'S', 'M', 'L'], style: 'Basic', colors: [COLORS.OLIVE, COLORS.BLACK], image: '/images/lisbon.jpg', bg: '#c867bd' },
  { id: 8, name: 'Dress porto', price: 120, stock: 2, isNew: false, categories: ['mini', 'satin', 'second'], sizes: ['S'], style: 'Knitwear', colors: [COLORS.WINE], image: '/images/porto.jpg', bg: '#4a3326' },
  { id: 9, name: 'Dress brasilia', price: 200, stock: 5, isNew: false, categories: ['mini', 'satin', 'second'], sizes: ['S'], style: 'Knitwear', colors: [COLORS.PLUM], image: '/images/brasilia.jpg', bg: '#4a3326' },
  { id: 10, name: 'Dress roma', price: 120, stock: 2, isNew: false, categories: ['mini', 'satin'], sizes: ['S'], style: 'Knitwear', colors: [COLORS.CHOCOLATE], image: '/images/roma.jpg', bg: '#4a3326' },
  { id: 11, name: 'Dress madrid', price: 500, stock: 2, isNew: false, categories: ['mini', 'satin'], sizes: ['S'], style: 'Knitwear', colors: [COLORS.CHOCOLATE], image: '/images/madrid.jpg', bg: '#4a3326' },
  { id: 12, name: 'Dress new york', price: 300, stock: 6, isNew: true, categories: ['midi'], sizes: ['M', 'L'], style: 'Basic', colors: [COLORS.BROWN, COLORS.BLACK, COLORS.BEIGE], image: '/images/newyork.jpg', bg: '#9a5626' },
];

module.exports = { categories, colorOptions, sizeOptions, styleOptions, dresses };