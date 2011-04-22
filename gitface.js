$(document).ready(function() {
  var match = window.location.hash.match(/#\/(\w+)\/(\w+)/);
  user = match[1];
  repo = match[2];
  
  console.log(user, repo);
  
  $.getJSON("http://github.com/api/v2/json/repos/show/"+user+"/"+repo+"/contributors?callback=?", function(response) {
    $.each(response.contributors, function(index, contributor) {
      $("body").append("<img src='http://www.gravatar.com/avatar/"+contributor.gravatar_id+"?s=300' />");
    });
  });
});