/*
const paypal = require('@paypal/checkout-server-sdk');

// Creating an environment
let clientId = "AbPfHl4rmjuW5fptWJJec7Vx9_VqCUxsqR48RSTepYhyE9dcYDsimVGgontvstnHOcrYZBE6WPMglcR3";
let clientSecret = "EB1fy5C1LBA-9XG8yg4ccUWyrP19cdQJjqU-8y17pprYPNycNx2Yxfj4Nyg1MkY3Vo4RPbk9jqyq0xis";

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// Construct a request object and set desired parameters
// Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
let request = new paypal.orders.OrdersCreateRequest();
request.requestBody({
    "intent": "CAPTURE",
    "purchase_units": [
        {
            "amount": {
                "currency_code": "USD",
                "value": "100.00"
            }
        }
    ]
});*/
