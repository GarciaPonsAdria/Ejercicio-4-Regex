/*
    Insertamos una serie de valores concretados en el documento de "Query Documents".
    Usaremos una nueva colección llamada "Arte" dentro de mi base de datos "Adri".

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
    {nombre: "Gondesa", nota: 6, Original: {fecha: new Date("1996,05,21"), autor:"Miguel",}, Stock: {qty: 3, disponible: false}, dimensiones: [7,3,4,3]},
    {nombre: "Bellaconda", nota: 7, Original: {fecha: new Date("1995,05,16"), autor:"Miguel" }, Stock: {qty: 5, disponible: true }, dimensiones: [2,1,1,1] },
    {nombre: "Parapeins", nota:9.5, Original: {fecha: new Date("2016,04,12"), autor:"Rafaelo" }, Stock: {qty: 6, disponible: true }, dimensiones: [5,2,1,1] },
    {nombre: "Liutein", nota: 3, Original: {fecha: new Date("1823,12,12"), autor:"Luiseiro" }, Stock: {qty:7, disponible: false}, dimensiones: [4,3,2,5] },
    {nombre: "Pepireiro", nota:9, Original: {fecha: new Date("1224,01,12"), autor:"Jorge" }, Stock: {qty: 1, disponible: false}, dimensiones: [7,2,1,1] },
    {nombre: "ChipsAwui", nota:4, Original: {fecha: new Date("2015,03,10"), autor:"Marlax" }, Stock: {qty:3, disponible: true }, dimensiones: [1,3,2,4] },
    {nombre: "Cincortei", nota:9, Original: {fecha: new Date("2012,04,19"), autor:"Miguel" }, Stock: {qty:15, disponible: true}, dimensiones: [3,4,3,5] },
    {nombre: "Pouketown", nota:9, Original: {fecha: new Date("2019,12,10"), autor:"Pol" }, Stock: {qty: 50, disponible: true}, dimensiones: [15,5,17,13] },
    {nombre: "Paperloset", nota: 1, Original: {fecha: new Date("2000,05,01"), autor:"Frederick" }, Stock: {qty:14, disponible: false}, dimensiones: [1,2,7,7] },
    {nombre: "Imaginité", nota:8, Original: {fecha: new Date("1994,02,02"), autor:"Marco" }, Stock: {qty:22, disponible:true }, dimensiones: [11,6,4,5] },
    {nombre: "Locure", nota: 2, Original: {fecha: new Date("1991,01,29"), autor:"Marco" }, Stock: {qty:2, disponible:false }, dimensiones: [1,2,4,2] },
    {nombre: "Pasione", nota:3, Original: {fecha: new Date("1934,12,10"), autor:"York" }, Stock: {qty: 6, disponible: true }, dimensiones: [2,4,7,4] },
    {nombre: "Peach", nota: 5, Original: {fecha: new Date("1926,10,05"), autor:"York" }, Stock: {qty: 5, disponible: false}, dimensiones: [8,3,4,2] },
    {nombre: "Peisach", nota: 6, Original: {fecha: new Date("1915,02,12"), autor:"Fidel" }, Stock: {qty: 2, disponible: false}, dimensiones: [7,5,2,2] },
    {nombre: "Essir", nota: 7, Original: {fecha: new Date("2019,10,13"), autor:"Mark" }, Stock: {qty: 13, disponible: true}, dimensiones: [11,2,6,3] },
    {nombre: "Florecer Lunado", nota: 2, Original: {fecha: new Date("2017,02,12"), autor:"Andres" }, Stock: {qty: 22, disponible: false}, dimensiones: [2,4,3,19] },
    {nombre: "Brishat", nota: 2.5, Original: {fecha: new Date("2014,03,01"), autor:"Aitana" }, Stock: {qty: 8, disponible: true}, dimensiones: [6,1,1,4] },
    {nombre: "Nuketown", nota: 3, Original: {fecha: new Date("2000,03,01"), autor:"Aitana" }, Stock: {qty: 5, disponible: true}, dimensiones: [3,2,1,1] },
    {nombre: "Poudown", nota: 8, Original: {fecha: new Date("1903,05,07"), autor:"York" }, Stock: {qty: 12, disponible: true}, dimensiones: [9,1,1,3] },
    {nombre: "Gioconda", nota: 10, Original: {fecha: new Date("1999,05,19"), autor:"Axel" }, Stock: {qty: 17, disponible: true}, dimensiones: [14,1,2,1] },
    {nombre: "Paperlu", nota: 4.5, Original: {fecha: new Date("2006,02,16"), autor:"Kevin" }, Stock: {qty: 13, disponible: false}, dimensiones: [13,5,2,3] },
    {nombre: "Maikeriu", nota: 9, Original: {fecha: new Date("1920,01,13"), autor:"Carl" }, Stock: {qty: 23, disponible: true}, dimensiones: [3,1,2,4] },
    {nombre: "Maireine", nota: 9.5, Original: {fecha: new Date("1920,11,04"), autor:"York" }, Stock: {qty: 1, disponible: false}, dimensiones: [6,4,5,3] },
]);
/* Insertamos los documentos concretados arriba y comenzamos a realizar querys

    Atención: Los recursos utilizados en cada una de las siguientes Querys vendrán explicados en el documento pdf adjunto.

 */

// Encuentra todos los documentos cuyas dimensiones sean: Para el primer valor mayor a 2, para el segundo menor a 3, para el tercer valor mayor o igual a 1 y 
// para el cuarto valor que no sea 3 o 4.
db.Arte.find({ $and: [{ "dimensiones.0": {$gt: 2} }, {"dimensiones.1": {$lte: 3} }, {"dimensiones.2": {$gte: 1} }, {"dimensiones.3": {$nin: [3,4]}} ] } )

// Encuentra todos los documentos cuyo Stock esté disponible, su cantidad de Stock sea mayor que 5 o cualquiera de sus dimensiones no mayor que 5 y que 
// tanto su nota no sea menor que 8 ni que la fecha del cuadro original sea posterior o igual al 01/01/1990
db.Arte.find ({$and: [{ "Stock.disponible":true}, {$or: [{"Stock.qty": {$gt:5}},{dimensiones: {$not: {$gt: 5}}} ] }, {$nor: [{nota: {$lt: 8}}, {"Original.fecha": {$gte: new Date("1990,01,01")}} ] } ] } ) 

// Busca todos los documentos cuyo autor sea "York", la nota sea o 3 o 5 u 8 y el nombre del cuadro no sea "Peach"
db.Arte.find ({$and: [{"Original.autor": {$eq: "York"}},{nota: {$in:[3,8,5]}}, {nombre: {$ne: "Peach"}}  ]})

// Ambas querys buscan todos los documentos cuyos títulos comiencen por la letra "P".
db.Arte.find( { nombre: /^P/} ) 
db.Arte.find( { nombre: { $regex: "^P" } } ) 
