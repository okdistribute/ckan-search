var through = require('through2')
var ckan = require('./')
var test = require('tape')

test('gets all items and stops', function (t) {
  var items = []
  var total = null

  var searcher = ckan()

  var stream = searcher.stream({fulltext: 'hello'})
  stream.pipe(through.obj(function (data, enc, next) {
    total = data.result.count
    for (var row in data.result.results) {
      items.push(row)
    }
    next()
  }))

  stream.on('end', function () {
    t.same(items.length, total)
    t.end()
  })
})
