/*
    Insertamos una serie de valores concretados en el documento de "Query Documents".
    Usaremos una nueva colección llamada "inventory" dentro de mi base de datos "Adri".

    Los insertaremos mediante la función "insertMany".
    
    Estructura: {
        nombre: string
        nota: int
        Original: Object {
            fecha: date
            autor: String
        }
        Stock: object {
            qty: int
            disponible: bool
        }
        dimensiones: ints array
        }
*/
db.Arte.insertMany([
    {nombre: "Gondesa", nota: 6, Original: {fecha: new Date("1996,05,21"), autor:"Miguel",}, Stock: {qty: 3, disponible: false}, dimensiones: [0,0,0,3]},
    {nombre: "Bellaconda", nota: 7, Original: {fecha: new Date("1995,05,16"), autor:"Miguel" }, Stock: {qty: 5, disponible: true }, dimensiones: [2,1,1,1] },
    {nombre: "Parapeins", nota:9.5, Original: {fecha: new Date("2016,04,12"), autor:"Rafaelo" }, Stock: {qty: 6, disponible: true }, dimensiones: [5,0,0,1] },
    {nombre: "Liutein", nota: 3, Original: {fecha: new Date("1823,12,12"), autor:"Luiseiro" }, Stock: {qty:7, disponible: false}, dimensiones: [0,0,2,5] },
    {nombre: "Pepireiro", nota:9, Original: {fecha: new Date("1224,01,12"), autor:"Jorge" }, Stock: {qty: 1, disponible: false}, dimensiones: [0,0,0,1] },
    {nombre: "ChipsAwui", nota:4, Original: {fecha: new Date("2015,03,10"), autor:"Marlax" }, Stock: {qty:25, disponible: true }, dimensiones: [10,3,8,4] },
    {nombre: "Cincortei", nota:6, Original: {fecha: new Date("2012,04,19"), autor:"Miguel" }, Stock: {qty:15, disponible: true}, dimensiones: [3,4,3,5] },
    {nombre: "Pouketown", nota:9, Original: {fecha: new Date("2019,12,10"), autor:"Pol" }, Stock: {qty: 50, disponible: true}, dimensiones: [15,5,17,13] },
    {nombre: "Paperloset", nota: 1, Original: {fecha: new Date("2000,05,01"), autor:"Frederick" }, Stock: {qty:14, disponible: false}, dimensiones: [0,0,7,7] },
    {nombre: "Imaginité", nota:8, Original: {fecha: new Date("1994,02,02"), autor:"Marco" }, Stock: {qty:22, disponible:true }, dimensiones: [11,6,0,5] },
    {nombre: "Locure", nota: 2, Original: {fecha: new Date("1991,01,29"), autor:"Marco" }, Stock: {qty:2, disponible:false }, dimensiones: [0,0,0,2] },
    {nombre: "Pasione", nota:3, Original: {fecha: new Date("1934,12,10"), autor:"York" }, Stock: {qty: 6, disponible: true }, dimensiones: [2,0,0,4] },
    {nombre: "Peach", nota: 5, Original: {fecha: new Date("1926,10,05"), autor:"York" }, Stock: {qty: 5, disponible: false}, dimensiones: [0,3,0,2] },
    {nombre: "Peisach", nota: 6, Original: {fecha: new Date("1915,02,12"), autor:"Fidel" }, Stock: {qty: 2, disponible: false}, dimensiones: [0,0,0,2] },
    {nombre: "Essir", nota: 7, Original: {fecha: new Date("2019,10,13"), autor:"Mark" }, Stock: {qty: 13, disponible: true}, dimensiones: [11,2,0,0] },
    {nombre: "Florecer Lunado", nota: 2, Original: {fecha: new Date("2017,02,12"), autor:"Andres" }, Stock: {qty: 22, disponible: false}, dimensiones: [0,0,3,19] },
    {nombre: "Brishat", nota: 2.5, Original: {fecha: new Date("2014,03,01"), autor:"Aitana" }, Stock: {qty: 8, disponible: true}, dimensiones: [6,1,1,0] },
    {nombre: "Nuketown", nota: 3, Original: {fecha: new Date("2000,03,01"), autor:"Aitana" }, Stock: {qty: 5, disponible: true}, dimensiones: [3,2,0,0] },
    {nombre: "Poudown", nota: 8, Original: {fecha: new Date("1903,05,07"), autor:"York" }, Stock: {qty: 12, disponible: true}, dimensiones: [9,0,0,3] },
    {nombre: "Gioconda", nota: 10, Original: {fecha: new Date("1999,05,19"), autor:"Axel" }, Stock: {qty: 17, disponible: true}, dimensiones: [14,1,2,0] },
]);
/* Insertamos los documentos concretados arriba y comenzamos a realizar querys

    Atención: Los recursos utilizados en cada una de las siguientes Querys vendrán explicados en el documento pdf adjunto.

 */

// Encuentra todos los documentos de una cantidad menor a 100 o cuyo status sea B o C.
db.Arte.find({ $or: [ { qty: { $gt: 5 } }, { dimensiones: { $gt: 5, $lt: 10 } } ], disponible:true } )

// Encuentra todos los documentos de una cantidad mayor a 50 y cuyo status A.
db.inventory.find({ $and: [ { qty: { $gte: 50 } }, { status: "A" } ] } )

// Encuentra los documentos que no tengan una cantidad igual a 250 o 100 y su "h" sea inferior a 5.
db.inventory.find({ $and: [ { qty: { $nin: [250,100] } }, { 'size.h': { $lt: 5 } } ] } )

// Encuentra todos los documentos cuyo status sea "B" y tengan por cantidad 250 
db.inventory.find({status:"B", qty:250})

// Encuentra todos los items que no empiecen por la letra "p"
db.inventory.find({ item: { $not: /^p.*/ } } )

// Encuentra todos los documentos cuyo status no sea B o su size.h no sea igual a 1.
db.inventory.find( { $nor: [ { 'size.h': {h:1} }, { status: "B" } ]  } ) 
