# ckan-search

Search CKAN and automatically traverse page list.

[![NPM](https://nodei.co/npm/ckan-search.png)](https://nodei.co/npm/ckan-search/)

## API

### `searcher = figshare(opts)`

Options:

`uri`: can be changed if you have your own deployment. default 'http://api.figshare.com'

`version`: defaults to 1.0, there is only one version of figshare search

`timeout`: not implemented

## Example
```js
var stream = searcher.stream({fulltext: 'your fulltext query text here'})
stream.on('data', function (data) {
  console.log(data.result.results) // each 'data' is a page from the search api
})
```

See test.js for an example.
