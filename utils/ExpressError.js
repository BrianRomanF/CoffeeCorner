class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        console.log('message', message)
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;