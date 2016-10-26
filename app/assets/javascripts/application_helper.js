(function() {
  this.WebApp = this.WebApp || {};
  var helpers = this.WebApp.helpers = this.WebApp.helpers || {};

  function getBodyData() {
    return $('body').data();
  }

  helpers.isCurrentResource = function(expectedResource) {
    var data = getBodyData();
    var resourceName = data['controllerName'] + '#' + data['actionName'];

    return expectedResource == resourceName;
  }
})(this);
