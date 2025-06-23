class BadRequestError extends Error {
    constructor (message) {
        super(message);
        this.statusCode = 400
    }
}

class UnauthorizedError extends Error {
    constructor (message) {
        super(message);
        this.statusCode = 401;
    }
}

//Wordt natuurlijk niet gebruikt.
//Maar ik noteer deze graag alsnog om de sequentie af te maken.
class PaymentRequiredError extends Error {
    constructor (message) {
        super(message);
        this.statusCode = 402;
    }
}

class ForbiddenError extends Error {
    constructor (message) {
        super(message);
        this.statusCode = 403;
    }
}

class NotFoundError extends Error {
    constructor (message) {
        super(message);
        this.statusCode = 404;
    }
}

module.exports = {
    BadRequestError : BadRequestError,
    PaymentRequiredError: PaymentRequiredError,
    UnauthorizedError : UnauthorizedError,
    ForbiddenError : ForbiddenError,
    NotFoundError : NotFoundError
}