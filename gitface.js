(function(){
  
  var gitfaces,
    baseUrl = "http://github.com/api/v2/json/repos/show/";
  
  // process the github response
  function process(response) {
    gitfaces.empty();
    $.each(response.contributors, function(index, contributor) {
      var div = $("<a/>",{
        className: "gitface",
        href: "https://github.com/"+contributor.login,
        target: "_blank"
      });
      // the image
      div.append($("<img/>",{
        src: "http://www.gravatar.com/avatar/"+contributor.gravatar_id+"?s=300"
      }));
      // the number of contributions
      div.append($("<span/>",{ className: "contributions", text: contributor.contributions }));
      // the username
      div.append($("<span/>",{ className: "login", text: contributor.login }));
      // throw it in
      gitfaces.append(div);
    });
  }
  
  function loadEarl() {
    var match = window.location.hash.match(/#\/(\w+)\/(\w+)/),
      user = match[1],
      repo = match[2];
      
    $.getJSON(baseUrl+user+"/"+repo+"/contributors?callback=?").success(process);
  }
  
  $(document).ready(function(){
    gitfaces = $("#gitfaces");
    
    var input = $("#addressbar input"),
      _input = input[0];
    
    input.focus(function(){
      input.addClass("typing");
      if(input.val() == _input.defaultValue) {
        input.val("");
      }
    }).blur(function(){
      if(input.val().match(/^$|^[\s]+$/)) {
        input.removeClass("typing");
        input.attr("value",_input.defaultValue);
      }
    });
    
    $("form").submit(function(event){
      event.preventDefault();
      (input.val().match(/(\w+)\/(\w+)/)) ?
        window.location.href = "#/"+input.val() :
        alert("That doesn't look like a github repo url");
    });
    
    // address handling
    $.address.change(loadEarl); 
  });
  
})();