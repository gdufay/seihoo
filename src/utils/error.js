export class ServerError extends Error {
    constructor(code, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError);
        }

        this.name = "ServerError";
        this.code = code;
    }
}