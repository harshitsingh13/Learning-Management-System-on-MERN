path = require 'path'
express = require 'express'

express.HTTPServer.prototype.handler =
express.HTTPSServer.prototype.handler = (namespace, routes) ->
  unless routes
    routes = namespace
    namespace = ""
  app = this
  setHandler = (method, action, fn) ->
    app[method] "/#{path.join namespace, action}", fn
  for action, callback of routes
    if typeof callback is "function"
      setHandler 'get', action, callback
    else
      for method, fn of callback
        setHandler method, action, fn