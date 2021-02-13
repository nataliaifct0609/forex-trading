// IMPORTACIONES

import { ValoresObjeto } from './ValoresObjeto.js';

// FUNCIONES

// busca el valor de apertura (de la propiedad OPEN) de cada dia (propiedad DTYYYYMMDD)(el primer valor de apertura de cada dia)
function buscarAperturaDia(array) {
  let day;
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    let date = array[i].DTYYYYMMDD;
    if (day != date) {
      day = date;
      for (let j = 0; j < array.length; j++) {
        if (array[j].DTYYYYMMDD === day) {
          arr.push(array[j].OPEN);
          break;
        }
      }
    }
  }

  //console.log('Apertura:', arr)
  return arr;
}

// busca el valor de cierre(de la propiedad CLOSE) de cada dia (propiedad DTYYYYMMDD)(el ultimo valor de cierre de cada dia)
function buscarCierreDia(array) {
  let day;
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    let date = array[i].DTYYYYMMDD;
    let res;
    if (day != date) {
      day = date;
      for (let j = 0; j < array.length; j++) {
        if (array[j].DTYYYYMMDD === day) {
          res = array[j].CLOSE;
        }
      }
      arr.push(res);
    }
  }

  //console.log('Cierre:', arr)
  return arr;
}

// busca el valor de maximo (de la propiedad HIGH) de cada dia (propiedad DTYYYYMMDD)(el valor de maximo de cada dia)
function buscarMaxDia(array) {
  let day;
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    let date = array[i].DTYYYYMMDD;
    if (day != date) {
      day = date;
      let res;
      let contador = 0;
      for (let j = 0; j < array.length; j++) {
        if (array[j].DTYYYYMMDD === day) {
          if (contador === 0) {
            res = array[j].HIGH;
          } else {
            res = Math.max(res, array[j].HIGH);
          }
          contador++;
        }
      }
      arr.push(res);
    }
  }

  // console.log('Maximos:', arr)
  return arr;
}

// busca el valor de minimo (de la propiedad LOW) de cada dia (propiedad DTYYYYMMDD)(el valor de minimo de cada dia)
function buscarMinDia(array) {
  let day;
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    let date = array[i].DTYYYYMMDD;
    if (day != date) {
      day = date;
      let res;
      let contador = 0;
      for (let j = 0; j < array.length; j++) {
        if (array[j].DTYYYYMMDD === day) {
          if (contador === 0) {
            res = array[j].LOW;
          } else {
            res = Math.min(res, array[j].LOW);
          }
          contador++;
        }
      }
      arr.push(res);
    }
  }

  //console.log('Minimos:', arr)
  return arr;
}

// crea los objetos con los valores de cada dia del mes, los convierte en un array y devuelve un array con todos los dias del mes
function obtenerValoresPorDias(array) {
  let res = [];
  let apertura = buscarAperturaDia(array);
  //console.log('Apertura:',apertura);
  let max = buscarMaxDia(array);
  //console.log('max:', max);
  let min = buscarMinDia(array);
  //console.log('min:', min);
  let cierre = buscarCierreDia(array);
  //console.log('Cierre:',cierre);

  for (let i = 0; i < max.length; i++) {
    let valores = new ValoresObjeto(
      apertura[i],
      max[i],
      min[i],
      cierre[i]
    )
    res.push(Object.values(valores));
  }
  return res;
}

// crea un array con los valores de cada dia por meses de todo el año
function valoresDiariosAnual(array) {
  let res = [];
  for (const key in array) {
    res.push(obtenerValoresPorDias(array[key]));
  }
  return res;
}

export { valoresDiariosAnual };