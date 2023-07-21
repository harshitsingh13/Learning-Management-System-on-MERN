# Handler

Handler is a tiny node module that all it does is monkey-patches [Express](http://expressjs.com), allowing you to write unRESTful route objects
Handler is written in coffeescript by [Marcel Miranda](http://reaktivo.com).

[Source Code](https://github.com/reaktivo/handler)

## Installation

    npm install handler


## Usage

    # First require handler
    require 'handler'

    # Create express app
    app = express.createServer()

    # Then user handler
    app.handler 'admin',
      dashboard: (req, res) -> ...
      user:
        get: (req, res) -> ...
        post: (req, res) -> ...

      # Which would be equivalent to
      app.get 'admin/dashboard', (req, res) -> ...
      app.get 'admin/user', (req, res) -> ...
      app.post 'admin/user', (req, res) -> ...


Copyright © 2012 Marcel Miranda. See LICENSE for further details.