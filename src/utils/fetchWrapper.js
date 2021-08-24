import { ServerError } from "./error";

const storage = window.localStorage;

const handleError = (results) => {
    if (results.code) {
        throw new ServerError(results.code, results.error);
    }
    return results;
}

const fetchWrapper = async (url, { method = "GET", body, stringify = true, auth = false } = {}) => {
    const headers = new Headers({
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "0PpmnebENvw8ccfGRSqesLXGVGsRMJOpEvZz2Hei",
        "X-Parse-REST-API-Key": "Ck76d2h5GmkJSpxB7U26sQyyV6UHZV7qtRxYR2Sg"
    });

    if (auth) {
        headers.set("X-Parse-Session-Token", storage.getItem("sessionToken"));
    }

    let init = { method: method, headers: headers };

    if (method === "POST" || method === "PUT") {
        init.body = stringify ? JSON.stringify(body) : body;
    }

    return fetch(url, init)
        .then(results => results.json())
        .then(handleError);
}

export default fetchWrapper;