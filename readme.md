# promise-utils-extended

Utility functions for enhanced promise operations in JavaScript, offering features like timeouts, retries, delays, concurrency control, and more.

## Installation

To install `promise-utils-extended`, run the following command in your terminal:

```
npm install promise-utils-extended
```

## Features

- **withTimeout**: Execute a promise with a timeout.
- **withRetry**: Retry a promise-returning function.
- **delayPromise**: Create a delayed promise.
- **runInSequence**: Run promises in sequence with a concurrency limit.
- **debouncePromise**: Debounce a promise-returning function.
- **fetchJsonWithRetry**: Get JSON data from a URL with retries.

## Usage

### withTimeout

```js
const { withTimeout } = require('promise-utils-extended');

const myPromise = new Promise((resolve) => setTimeout(resolve, 2000));
withTimeout(myPromise, 1000).catch(error => console.error(error.message));
```

### withRetry

```js
const { withRetry } = require('promise-utils-extended');

const myFunction = () => fetch('https://api.example.com/data');
withRetry(myFunction, { retries: 3 }).then(response => console.log(response));
```

### delayPromise

```js
const { delayPromise } = require('promise-utils-extended');

delayPromise(2000).then(() => console.log('Executed after 2 seconds'));
```

## Contributing

Contributions are welcome! Please submit a pull request on GitHub.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
