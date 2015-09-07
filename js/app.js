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
    // I have no idea how this works. Taken from:
    // https://github.com/twitter/twemoji/blob/gh-pages/twemoji-generator.js
    function toCodePoint(unicodeSurrogates, sep) {
      var r = [], c = 0, p = 0, i = 0;
      while (i < unicodeSurrogates.length) {
        c = unicodeSurrogates.charCodeAt(i++);
        if (p) {
          r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
          p = 0;
        } else if (0xD800 <= c && c <= 0xDBFF) {
          p = c;
        } else {
          r.push(c.toString(16));
        }
      }
      return r.join(sep || '-').replace('-fe0f',''); // WHAT IS GOING ON
    }

    var unicode = toCodePoint(emojis[shortname].char);
    return '<img class="emojione" src="https://twemoji.maxcdn.com/16x16/'+unicode+'.png"> :'+shortname+':';
  },
  replace: function (shortname) {
    return emojis[shortname].char;
  },
  index: 1,
  maxCount: 8
}]);

