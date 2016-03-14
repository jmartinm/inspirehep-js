(function(angular) {

// Services

  function exportAPI($http) {

    var service = {
      getFormat: getFormat
    }

    return service;

    function getFormat(format, id) {

      // Make the request and pass id
      switch (format) {
        case "bibtex":
          return $http.get("/export/bibtex");
          break;
        case "latexus":
          return $http.get("/export/latexus");
          break;
        default:
            return $http.get("/export/latexeu");
      }
      console.log("sending http request....")
    }
  
  }

  // Inject the necessary angular services
  exportAPI.$inject = ['$http'];

  angular.module('citemodal.services', [])
    .service('exportAPI', exportAPI);

})(angular);