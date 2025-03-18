document.addEventListener('DOMContentLoaded', function() {
    const amount = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const resultText = document.getElementById('resultText');

    let currencies = [];

    // Fetch currencies from the API
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            currencies = Object.keys(data.rates);
            populateCurrencyOptions(currencies);
        })
        .catch(error => console.error('Error fetching currencies:', error));

    function populateCurrencyOptions(currencies) {
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);
        });
    }

    convertBtn.addEventListener('click', function() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amt = amount.value;

        if (from && to && amt) {
            fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.rates[to];
                    const result = (amt * rate).toFixed(2);
                    resultText.textContent = `${amt} ${from} = ${result} ${to}`;
                })
                .catch(error => console.error('Error converting currency:', error));
        } else {
            resultText.textContent = 'Please fill in all fields.';
        }
    });
});