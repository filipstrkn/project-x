class Err {
    constructor(type, res) {
        this.type = type
        this.message = {
            '401': 'Unauthorized',
            '404': 'Not Found',
            '409': 'Conflict',
            '500': 'Server Error'
        }
        this.res = res
    }


    send() {
        this.res.status(this.type).send(this.message[this.type])
    }


}