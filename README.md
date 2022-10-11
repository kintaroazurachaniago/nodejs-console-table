# nodejs-console-table
This module is useful for creating tables with string data types from data objects-in-arrays javascript/nodejs in console or terminal

# Installation

```
$ npm install nodejs-console-table
```

Or

```
$ git clone https://github.com/kintaroazurachaniago/nodejs-console-table.git
```

# Usage

For example, we have the following data:

```javascript
const data = [ /* array */
  /* object */
  { name : 'Naruto uzumaki', wife : 'Hinata hyuga', income : 100000 },
  { name : 'Sasuke uchiha', wife : 'Sakura haruno', income : 70000 },
  { name : 'Kakashi hatake', wife : null, income : 50000 },
  { name : 'Shikamaru nara', wife : 'Temari Kazekage', income : null }
]
```

We can turn the data above into a table in the following way

```javascript
const Table = require('nodejs-console-table')

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
```

# Result

```
+----------------+-----------------+------------+
| Name           | Wife            |     Income |
+----------------+-----------------+------------+
| Naruto uzumaki | Hinata hyuga    | 100.000,00 |
| Sasuke uchiha  | Sakura haruno   |  70.000,00 |
| Kakashi hatake |        -        |  50.000,00 |
| Shikamaru nara | Temari Kazekage |     -      |
+----------------+-----------------+------------+
```

# Thank you for visiting :)
