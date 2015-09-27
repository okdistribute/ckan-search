var debug = require('debug')('ckan-search')
var pager = require('paged-http-stream')
var qs = require('querystring')

module.exports = CKAN

function CKAN (opts) {
  if (!(this instanceof CKAN)) return new CKAN(opts)
  if (!opts) return new CKAN({})

  this.version = opts.version || '3'
  this.start = opts.start || 0
  this.rows = opts.rows || 50
  this.uri = (opts.uri || 'http://datahub.io/api/') + this.version + '/action/package_search'
}

CKAN.prototype._reqOpts = function (query) {
  var self = this
  var querystring = qs.stringify({
    q: query.fulltext,
    start: self.start,
    rows: self.rows
  })
  var opts = {
    method: 'GET',
    uri: this.uri + '?' + querystring,
  }
  return opts
}

CKAN.prototype.stream = function (query) {
  var self = this

  function next (data) {
    if (data.error) throw new Error(data.error)
    if (data.result.results.length === 0) return null // we are done here
    self.rows += self.rows
    self.start += self.rows
    return self._reqOpts(query)
  }

  var opts = self._reqOpts(query)
  debug('sending to pager', opts, next)
  return pager(opts, next)
}
