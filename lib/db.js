'use strict'
const r = require('rethinkdb')
const co = require('co')
const Promise = require('bluebird')


const defaults = {
    host: 'localhost',
    port: 28015,
    db: 'platzigram122'
}

class Db {

    constructor(options) {
        options = options || {}
        this.host = options.host || defaults.host
        this.port = options.port || defaults.port
        this.db = options.db || defaults.db
        this.setup = options.setup || false
    }

    connect(callback) {
        this.connection = r.connect({
            host: this.host,
            port: this.port
        })

        let db = this.db
        let connection = this.connection



        //la funcion generadora lleva un  * en vez de nombre
        let setup = co.wrap(function* () {
            let conn = yield connection

            let dblist = yield r.dbList().run(conn)
            if (dblist.indexOf(db) === -1) {
                yield r.dbCreate(db).run(conn)
            }

            let dbTables = yield r.db(db).tableList().run(conn)
            if (dbTables.indexOf('images') === -1) {
                yield r.db(db).tableCreate(db).run(conn)
            }

            if (dbTables.indexOf('users') === -1) {
                yield r.db(db).tableCreate(db).run(conn)
            }
            return conn

        })
        return Promise.resolve(setup()).asCallback(callback)
    }

    saveImage(image, callback) {

    }

}

module.exports = Db