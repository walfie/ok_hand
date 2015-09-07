// Modified version of http://git.emojione.com/demos/autocomplete.html
$('#content').focus().textcomplete([{
  match: /:([\-+\w]*):?$/,
  search: function (term, callback) {
    var results = [];
    var results2 = [];
    var results3 = [];
    $.each(emojiStrategy, function(shortname, data) {
      if (shortname.indexOf(term) > -1) { results.push(shortname); }
      else {
        if (data.aliases && data.aliases.indexOf(term) > -1) {
          results2.push(shortname);
        }
        else if (data.keywords && data.keywords.indexOf(term) > -1) {
          results3.push(shortname);
        }
      }
    });

    if (term.length >= 2) {
      var comparator = function(a, b) {
        // Sort by how early the term exists in the shortname.
        // If the same, return the shorter shortname.
        var index = a.indexOf(term) - b.indexOf(term);
        return index || (a.length - b.length);
      }

      results.sort(comparator);
      results2.sort(comparator);
      results3.sort();
    }
    var newResults = results.concat(results2).concat(results3);

    callback(newResults);
  },
  template: function (shortname) {
    var unicode = emojiStrategy[shortname].unicode.toLowerCase();
    return '<img class="emojione" src="https://twemoji.maxcdn.com/16x16/'+unicode+'.png"> :'+shortname+':';
  },
  replace: function (shortname) {
    var emojiInt = parseInt(emojiStrategy[shortname].unicode, 16);
    return String.fromCodePoint(emojiInt);
  },
  index: 1,
  maxCount: 8
}]);

