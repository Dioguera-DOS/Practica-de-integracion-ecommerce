const { faker } = require('@faker-js/faker');

const generateProducts = () => {
    let code = faker.string.alphanumeric(2) + faker.string.numeric({ length: 6, allowLeadingZeros: true });//genera un código alphanumerico con 2 letras y 6 numeros aleatorio. 
    let description = faker.commerce.productName();
    //let descript=faker.commerce.product();
    let price = faker.number.float({ min: 800, max: 8300, fractionDigits: 2 });
    let stock = faker.number.int({ min: 10, max: 100 });
    let title = faker.commerce.productName();
    let category = faker.number.int({ min: 1, max: 5 })    
    return {
        title, code, description, price, stock,  category, 
    }

}

module.exports = { generateProducts }