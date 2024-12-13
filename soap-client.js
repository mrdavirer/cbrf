const soap = require('soap');

const url = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL';

function getValutes() {
    soap.createClient(url, (err, client) => {
        if (err) throw err;
        client.EnumValutesXML({ Seld: false }, (err, result) => {
            if (err) throw err;
            console.log(JSON.stringify(result.EnumValutesXMLResult));
        });
    });
}

function getValute(code, fromDate, toDate) {
    soap.createClient(url, (err, client) => {
        if (err) throw err;
        client.GetCursDynamicXML({ FromDate: fromDate, ToDate: toDate, ValutaCode: code }, (err, result) => {
            if (err) throw err;
            console.log(JSON.stringify(result.GetCursDynamicXMLResult));
        });
    });
}

getValutes();

