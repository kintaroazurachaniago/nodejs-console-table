const Table = require('./index')

Number.prototype.formatAngka = function (hasil = '') {
  this.toString().split('').reverse().forEach( (a, i) => hasil += i % 3 === 0 && i > 0 ? '.' + a : a )
  return hasil.split('').reverse().join('') + ',00'
}

const data = [ /* array */
  /* object */
  { name : 'Naruto uzumaki', wife : 'Hinata hyuga', income : 100000 },
  { name : 'Sasuke uchiha', wife : 'Sakura haruno', income : 70000 },
  { name : 'Kakashi hatake', wife : null, income : 50000 },
  { name : 'Shikamaru nara', wife : 'Temari Kazekage', income : null }
]

data.map( d => d.income = d.income ? d.income.formatAngka() : d.income )
const table = new Table(data, { right /* align */ : ['income'] }).table

console.log(table)