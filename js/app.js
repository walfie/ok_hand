// Modified version of http://git.emojione.com/demos/autocomplete.html
$('#content').focus().textcomplete([{
  match: /:([\-+\w]*):?$/,
  search: function (term, callback) {
    var results = [];
    var results2 = [];
    $.each(emojis, function(shortname, data) {
      if (data.category == '_custom') { return; }

      if (shortname.indexOf(term) > -1) {
        results.push(shortname);
      } else if (data.keywords && data.keywords.join(' ').indexOf(term) > -1) {
        results2.push(shortname);
      }
    });

    var comparator = function(a, b) {
      // Sort by how early the term exists in the shortname.
      // If the same, return the shorter shortname.
      var index = a.indexOf(term) - b.indexOf(term);
      return index || (a.length - b.length);
    }

    results.sort(comparator);
    results2.sort(comparator);

    var newResults = results.concat(results2);

    callback(newResults);
  },
  template: function (shortname) {
    var imgTag = twemoji.parse(emojis[shortname].char);
    return imgTag + ' :' + shortname + ':';
  },
  replace: function (shortname) {
    return emojis[shortname].char;
  },
  index: 1,
  maxCount: 8
}]);

