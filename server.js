const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');

const app = express();
app.use(bodyParser.json());

const url = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL';

app.post('/getValutes', (req, res) => {
    const { currencyCode } = req.body; 
    soap.createClient(url, (err, client) => {
        if (err) return res.status(500).send(err);
        client.EnumValutesXML({ Seld: false }, (err, result) => {
            if (err) return res.status(500).send(err);

            const valutes = result.EnumValutesXMLResult;
            console.log('Полученные валюты:', valutes); 

            const valuteArray = Array.isArray(valutes) ? valutes : [valutes];

            const filteredValutes = valuteArray.filter(valute => valute.Code === currencyCode);
            res.json(filteredValutes);
        });
    });
});

app.post('/getValute', (req, res) => {
    const { code, fromDate, toDate } = req.body;
    soap.createClient(url, (err, client) => {
        if (err) return res.status(500).send(err);
        client.GetCursDynamicXML({ FromDate: fromDate, ToDate: toDate, ValutaCode: code }, (err, result) => {
            if (err) return res.status(500).send(err);

            console.log('Полученные курсы:', result); 
            const rates = result.GetCursDynamicXMLResult;

            const ratesArray = Array.isArray(rates) ? rates : [rates];

            const formattedRates = ratesArray.map(rate => ({
                date: rate.Date,
                value: rate.Value
            }));

            res.json(formattedRates);
        });
    });
});

app.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
});
