const axios = require('axios');

async function getValutes(currencyCode) {
    try {
        const response = await axios.post('http://localhost:3000/getValutes', { currencyCode });
        console.log(`Курсы валют для ${currencyCode}:`, JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

async function getValute(code, fromDate, toDate) {
    try {
        const response = await axios.post('http://localhost:3000/getValute', { code, fromDate, toDate });
        console.log(`Курс ${code} с ${fromDate} по ${toDate}:`, JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

getValutes();
