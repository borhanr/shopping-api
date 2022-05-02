// Global http response to unify return data
class HttpResponse {
    status;
    message;
    data;

    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data || null;
    }
}

module.exports = HttpResponse;
