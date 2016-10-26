(function() {
  this.WebApp = this.WebApp || {};
  var helpers = this.WebApp.helpers = this.WebApp.helpers || {};

  function getBodyData() {
    return $('body').data();
  }

  function isCurrentResource(expectedResource) {
    var data = getBodyData();
    var resourceName = data['controllerName'] + '#' + data['actionName'];

    return expectedResource == resourceName;
  }

  helpers.getBodyData = getBodyData;
  helpers.isCurrentResource = isCurrentResource;
})(this);
