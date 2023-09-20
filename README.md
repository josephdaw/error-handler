# Error Handler
[![npm (scoped)](https://img.shields.io/npm/v/%40josephdaw/error-handler?logo=npm)](https://www.npmjs.com/package/@josephdaw/error-handler)
![GitHub](https://img.shields.io/github/license/josephdaw/error-handler)
[![Node.js CI](https://github.com/josephdaw/error-handler/actions/workflows/node-testing.yml/badge.svg)](https://github.com/josephdaw/error-handler/actions/workflows/node-testing.yml)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)


## Table of Contents
- [Description](#description)
- [Features](#features)
- [Issues and Requests](#issues-and-requests)
- [Security](#security)
- [Contributing](#contributing)
- [Changes](#changelog)
- [License](#license)


## Description
A custom error handler for a node.js and express application.

## Installation
### Using npm
```bash
npm install @josephdaw/error-handler
```

## Usage
### Importing
```javascript
const { errorhandler, CustomError} = require('@josephdaw/error-handler');
```
### Basic Usage
In your express application, add the error handler as the last middleware.
```javascript
const errorhandler = require('@josephdaw/error-handler');
const express = require('express');
const app = express();

// ... other middleware

app.use(errorhandler());
```
### Using with a Custom Logger
You can pass a custom logger to the error handler. The logger must have a `log` method that accepts a string. In the example below, we are using a custom logger package. You can create your own custom logger, or just pass in a generic logger such as winston or pino.
```javascript
const logger = require('@josephdaw/logger');
const errorhandler = require('@josephdaw/error-handler');
const express = require('express');
const app = express();

// ... other middleware

app.use((err, req, res, next) => {
    errorHandler(err, req, res, next, logger);
});
```

### Using with a Custom Error
You can pass a custom error to the error handler. The error must be an instance of the CustomError class. In the example below, we are using a custom error package. You can create your own custom error, or just pass in a generic error such as the built in Error class.
```javascript
const { CustomError } = require('@josephdaw/error');

app.all('*', (req, res, next) => {
    const err = new CustomError('Route Not Found', 404);
    next(err);
});
```



## Issues and Requests
Please report any bugs or feature requests via [GitHub Issues](https://github.com/josephdaw/error-handler/issues). 

## Security 
Please report any security issues to [dev@josephdaw.com](mailto:dev@josephdaw.com). Find more information in our [Security Policy](.github/SECURITY.md)

## Contributing
All development of this project happens through GitHub. We welcome constructive collaboration from the community to help implement new features or fix bugs. For more information please read our [Contribution Guide](.github/CONTRIBUTING.md)

## Changelog
Every significant change is documented in the [changelog file](CHANGELOG.md). 

## License
This project is released under the [MIT License](LICENSE).
