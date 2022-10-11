/*

App     : CLI-Table
Language: Javascript
Coder   : Kintaro azura chaniago
FTD     : 09/10/2022
Locale  : Indonesia, bengkulu

*/

/* Prototype string ini guna nya buat ganti karakter di dalam string berdasarkan index nya */
String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

/* Class table guna nya buat bikin table */
class Table {

  data  = {} /* Data nya harus berupa objek dalam array [{}] */
  kunci = [] /* Kunci ini nanti diisi kuci-kunci objek */
  max   = {} /* Panjang value maximal disimpen disini */
  table = '\n' /* Nilai awal text table */

  constructor (data, opsi = { kanan : [] }) {
    this.data = data
    this.opsi = opsi
    
    this.kumpulkanKunci() /* Ngumpulin kunci-kunci */
    this.buatKepala() /* Bikin kepala/header tabel */
    this.temukanMax() /* Nyari value terpanjang */
    this.susunTabel() /* Nyusun text tabel */
  }

  /* Nyari value terpanjang supaya colum table bisa diratain */
  temukanMax () {
    this.kunci.forEach( kunci => {

      /* Nilai awal */
      this.max[kunci] = 0
  
      this.data.forEach( data => {
        this.max[kunci]
        = data[kunci] /* Value nya ada gak? */
        ? data[kunci].toString().length > this.max[kunci] /* Klo ada, panjangan value atau nilai sebelum nya? */
        ? data[kunci].toString().length /* klo panjangan value */
        : this.max[kunci] /* klo panjangan nilai sebelum nya */
        : this.max[kunci] /* klo ga ada valu nya, pake nilai sebelum nya */
      })
  
    })
  }
 
  /* Ngumpulin kunci-kunci objek untuk kepala table */
  kumpulkanKunci () {
    this.data.forEach( data => {
      Object.keys( data ).forEach( (ok, index) => {
        /* Klo kunci nya blom dimasukin ke daftar kunci, masukin */
        if ( !this.kunci.includes(ok) ) this.kunci.splice( index, 0, ok )
      })
    })
  }

  /* Bikin kepala/header table */
  buatKepala () {
    const [
      kepala, /* Inisialisasi variable kepala */
      value
    ] = [
      {}, /* Nilai awal variable kepala */
      /* Kepala/header table berbentuk kapital */
      this.kunci.map( kunci => kunci[0].toUpperCase() + kunci.slice(1))
    ]

    /* Ngisi objek kepala */
    this.kunci.forEach( (kunci, index) => kepala[kunci] = value[index] )

    /* Masukin objek kepala di index 0 array */
    this.data.unshift(kepala)
  }

  susunTabel () {
    /* Nentuin letak garis dan isi */
    this.data.forEach( (data, index) => {

      /* Border atas kepala table */
      if ( index === 0 ) this.tulisGaris()

      /* Isi table */
      this.tulisData(data)

      /* Border bawah kepala dan badan table */
      if ( index === 0 || index === this.data.length - 1 ) this.tulisGaris()

    })
  }

  /* Cuma bikin garis buat border horizontal */
  tulisGaris () {

    /* Di awal kasih tanda + */
    this.table += '+'

    this.kunci.forEach( kunci => {
      for ( let x = 0; x < this.max[kunci] + 2; x++ ) this.table += ('-') /* Sepanjang kunci, kasih - */
      this.table += '+' /* Tiap ganti kunci, tambah + */
    })
    
    /* Klo udah, bikin baris baru */
    this.table += '\n'
  }

  /* Nulis data di dalam badan/body table */
  tulisData (data) {

    /* Di awal kasih tanda | */
    this.table += '|'

    this.kunci.forEach( kunci => {

      /* Klo ada value nya */
      if (data[kunci]) {
        
        /* Klo ada opsi kanan, spasi dulu baru text */
        if ( this.opsi.kanan?.includes(kunci) || this.opsi.right?.includes(kunci) ) {
          /* Spasi dulu */
          for ( let x = 0; x < this.max[kunci] - data[kunci].toString().length; x++ ) this.table += ' '
          /* Baru text */
          this.table += ` ${data[kunci].toString()} ` /* Menulis data dalam kotak table */
        }

        /* Default nya text dulu baru spasi */
        else {
          /* Text dulu */
          this.table += ` ${data[kunci].toString()} ` /* Menulis data dalam kotak table */
          /* Baru spasi */
          for ( let x = 0; x < this.max[kunci] - data[kunci].toString().length; x++ ) this.table += ' '
        }
        
        /* Tiap ganti kunci tambahin tanda | */
        this.table += '|'

      }

      /* Klo ga ada value nya */
      else {
        /* Isi penuh sama spasi */
        for ( let x = 0; x < this.max[kunci] + 2; x++ ) this.table += ' '
        /* trus di tengah nya ganti satu spasi menjadi - */
        this.table = this.table.replaceAt(this.table.length - Math.floor((this.max[kunci] / 2) + 2), '-')
        /* ganti kunci lagi deh */
        this.table += '|'
      }

    })

    /* Klo kunci terakhir kasih tanda \n */
    this.table += '\n'
  }

}

module.exports = Table

// /* Contoh data */
// const data = [ /* Ini array */
//   /* Isi array nya objek */
//   { nama : 'Naruto uzumaki', istri : 'Hinata hyuga', gaji : 100000 },
//   { nama : 'Sasuke uchiha', istri : 'Sakura haruno', gaji : 70000 },
//   { nama : 'Kakashi hatake', istri : null, gaji : 50000 },
//   { nama : 'Shikamaru nara', istri : 'Temari Kazekage', gaji : null }
// ]

// /* Mengubah data dengan tipe data objek di dalam array menjadi table dengan tipe data text */
// const table = new Table(data).table

// /* Menampilkan table dengan tipe data text */
// console.log(table)
