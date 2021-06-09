# Rest service that returns stock ticker prices

### Sample a stock request with Javascript fetch:

```sh
fetch('https://stocksapi.herokuapp.com/stock',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      'ticker': ticker,
      'type': 'daily'
    })
  })
```

### CURL
```sh
curl --location --request POST 'http://localhost:8080/stock' \
--header 'Content-Type: application/json' \
--data-raw '{
    "tickers": "AAPL",
      "type": "daily"
}'
```

### Parameters
type : 'monthly','daily'
ticker : 'any'  ie.AAPL
