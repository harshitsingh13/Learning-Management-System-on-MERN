'use strict'
var _ = require('lodash')
var assert = require('assert')
var final = require('..')
var http = require('http')
var sinon = require('sinon')

describe('final', () => {
  function core (options) {
    return _.parseInt(options.first) + _.parseInt(options.second)
  }

  var command = new final.Command(core)

  var options = { first: 1, second: 2 }
  var stringOptions = _.mapValues(options, String)

  describe('Command', () => {
    describe('constructor', () => {
      it('uses the given core', () => {
        assert.strictEqual(command.core, core)
      })
    })

    describe('#run()', () => {
      it('returns a String result', () => {
        assert.strictEqual(command.run(options), '3')
      })
    })
  })

  describe('Runner', () => {
    describe('constructor', () => {
      it('uses the given command', () => {
        assert.strictEqual(new final.Runner(command).command, command)
      })
    })
  })

  describe('API', () => {
    var api = new final.API(command)

    var req = new http.IncomingMessage()
    req.url = 'http://localhost:3000?first=1&second=2'

    after(() => api.close())

    describe('constructor', () => {
      it('creates a server', () => {
        assert(api.server instanceof http.Server)
      })
    })

    describe('#callback()', () => {
      it('is a function', () => {
        assert(api.callback instanceof Function)
      })

      it('takes a request and a response', () => {
        assert.strictEqual(api.callback.length, 2)
      })
    })

    describe('#close()', () => {
      it('closes the server', (done) => {
        api.close()

        http.get('http://localhost:3000', () =>
          done('Error: API server should be closed')
        ).on('error', () => done())
      })
    })

    describe('.options()', () => {
      it('returns options from the given request', () => {
        assert.deepStrictEqual(final.API.options(req), stringOptions)
      })
    })

    describe('#run()', () => {
      var res

      function run (done) {
        api.run()
        http.get(req.url, (thisRes) => {
          res = thisRes
          done()
        }).on('error', done)
      }

      it('runs its server for the given command', run)

      describe('response', () => {
        before(run)

        it('has a 200 status code', () => {
          assert.strictEqual(res.statusCode, 200)
        })

        it('has a text/plain content type', () => {
          assert.strictEqual(res.headers['content-type'], 'text/plain')
        })

        it('has a body with a result', (done) => {
          res.on('data', (chunk) => {
            assert.strictEqual(chunk.toString('utf8'), '3\n')
            done()
          })
        })
      })
    })
  })

  describe('CLI', () => {
    var cli = new final.CLI(command)
    process.argv = 'node cli.js --first 1 --second 2'.split(' ')

    describe('.options()', () => {
      it('returns options from argv', () => {
        assert.deepStrictEqual(final.CLI.options(), options)
      })
    })

    describe('#run()', () => {
      it('runs a cli for the given command that prints a result', sinon.test(function () {
        this.stub(console, 'log')
        cli.run()

        sinon.assert.calledOnce(console.log)
        sinon.assert.calledWithExactly(console.log, '3')
      }))
    })
  })
})
