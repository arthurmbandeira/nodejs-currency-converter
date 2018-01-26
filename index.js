// const _ = require('lodash');
// const http = require('http');
const moment = require('moment');
const request = require('bluebird').promisifyAll(require('request'), { multiArgs: true });

const fixerUrl = 'https://api.fixer.io';

const currencyCodes = ['AED', 'ARS', 'AUD', 'BGN', 'BND', 'BOB', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CZK', 'DKK', 'EGP', 'EUR', 'FJD', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KES', 'KRW', 'LTL', 'MAD', 'MXN', 'MYR', 'NOK', 'NZD', 'PEN', 'PHP', 'PKR', 'PLN', 'RON', 'RSD', 'RUB', 'SAR', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'UAH', 'USD', 'VEF', 'VND', 'ZAR'];

const convertCurrency = (value, currencyFrom, currencyTo, day) => {
  const formatedDay = (!day) ? '/latest' : moment(day).format('YYYY-MM-DD');
  const currencyInput = [currencyFrom, currencyTo];

  if (currencyInput.every(i => currencyCodes.includes(i))) {
    request.getAsync(`${fixerUrl}${formatedDay}?base=${currencyFrom}`).then((response) => {
      // console.log(response);
      // console.log(response[1].rates[currencyTo]);
      const parsedResponse = JSON.parse(response[1]);
      const rateFrom = parsedResponse.rates[currencyTo];
      const convertedValue = value * rateFrom;
      return {
        currencyFrom,
        currencyTo,
        value,
        convertedValue,
      };
    });
  } else {
    throw new Error('invalid currency code.');
  }
};

// console.log(convertCurrency(1, 'USD', 'BRL'));
// convertCurrency(1, 'BRL', 'USD');

module.exports = convertCurrency;
