import { ServerError } from "./error";

const storage = window.localStorage;

const handleError = (results) => {
    if (results.code) {
        throw new ServerError(results.code, results.error);
    }
    return results;
}

const logAndThrow = (e) => {
    if (e instanceof ServerError) {
        console.error(`Code ${e.code}: $${e.message}`);
    } else {
        console.error(e);
    }
    throw e;
}

const jsonify = (results) => results.json();

// Simple wrapper around fetch to call b4a api
// Most of the methods return this to link methods call
export default class FetchWrapper {
    #headers = new Headers({
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
        "X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
    });
    #url = "";
    #method = "";
    #body = null;

    constructor(url, method = "GET", body) {
        this.#url = url;
        this.#method = method;
        this.#body = body;

        if (method !== "GET" && method !== "DELETE" && !body) {
            throw Error("body is required when method is: " + method);
        }

    }

    requireAuth() {
        this.#headers.set("X-Parse-Session-Token", storage.getItem("sessionToken"));

        return this;
    }

    stringify() {
        this.#body = JSON.stringify(this.#body);

        return this;
    }

    async fetch() {
        return fetch(this.#url, { method: this.#method, headers: this.#headers, body: this.#body })
            .then(jsonify)
            .then(handleError)
            .catch(logAndThrow);
    }
}