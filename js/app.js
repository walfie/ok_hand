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

    if (term.length >= 3) {
      results.sort(function(a,b) { return (a.length > b.length) ? 1 : -1; });
      results2.sort(function(a,b) { return (a.length > b.length) ? 1 : -1; });
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

