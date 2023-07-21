'use strict'
var _ = require('lodash')
var http = require('http')
var minimist = require('minimist')
var url = require('url')

class Command {
  constructor (core) {
    this.core = core
  }

  run (options) {
    return String(this.core(_.mapValues(options, String)))
  }
}

class Runner {
  constructor (command) {
    this.command = command
  }
}

class API extends Runner {
  constructor (command) {
    super(command)
    this.server = http.createServer(this.callback.bind(this))
  }

  callback (req, res) {
    res.setHeader('content-type', 'text/plain')
    res.writeHead(200)
    res.end(`${this.command.run(API.options(req))}\n`)
  }

  close () {
    this.server.close()
  }

  static options (req) {
    return url.parse(req.url, true).query
  }

  run () {
    this.server.listen(3000)
  }
}

class CLI extends Runner {
  static options () {
    var args = minimist(process.argv.slice(2))
    return _.omit(args, '_')
  }

  run () {
    console.log(this.command.run(CLI.options()))
  }
}

module.exports = { Command, Runner, API, CLI }
