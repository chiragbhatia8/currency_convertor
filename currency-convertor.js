const axios = require('axios');

//call the api to retreive the data of currency using promises
// const getExchangeRates = (fromCurrency, toCurrency) => {
//     axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1').then((response) => {
//         const rate = response.data.rates;
//         const euro = 1 / rate[fromCurrency];
//         const exchangeRate = euro * rate[toCurrency];
//         console.log(exchangeRate);
//     });
// }

//to make currency asynchronous
const getExchangeRates =  async (fromCurrency, toCurrency) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');
    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];
    //isNotANumber, 
    if(isNaN(exchangeRate)) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`)
    }
    
    return exchangeRate;
}

//getCountries, await waits to retrieve the data from the API until then response variable is empty
const getCountries = async (toCurrency) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
        response.data.map(country => console.log(country.name));
        return response.data.map(country => country.name);


    } catch(error) {
        throw new Error(`Unable to get countries that use ${toCurrency}`)
    }
    }


// getExchangeRates('USD', 'EUR')

const convertCurrency =  async (fromCurrency, toCurrency, amount) => {
    const countries = await getCountries(toCurrency);
    const exchangeRate = await getExchangeRates(fromCurrency, toCurrency);
    //toFixed to return upto 2 decimal points
    const convertedAmount = (amount * exchangeRate).toFixed(2)

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in following countries ${countries}`;
}

convertCurrency('12', 'INR', 30).then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error.message);
});