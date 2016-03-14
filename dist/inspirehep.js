(function(angular) {

  angular.module('inspirehep', [
    'citemodal'
  ]);

})(angular);

(function(angular) {

  angular.module('citemodal', [
    'ui.bootstrap',
    'citemodal.directives',
    'citemodal.services',
    'citemodal.controllers'
  ]);

})(angular);

(function(angular) {

  // Controllers

  function modalInstanceCtrl($scope, $uibModalInstance, exportAPI) {
    var vm = this;

    // This will contain the export text
    vm.exportContent = null;

    // Keeps loading state
    vm.loading = false;
    
    // Format to export
    vm.exportFormat = 'bibtex';

    vm.changeFormat = changeFormat;

    vm.closeModal = closeModal;

    activate();

    function activate() {
      // Do initial request for data
      return;
    }

    function closeModal() {
      // Available from inspireCiteModal scope
      vm.$close();
    }

    function changeFormat(format) {
       vm.exportFormat = format;
    }

    function onExportFormatChanged(format) {

      vm.loading = true;

      exportAPI
        .getFormat(format, vm.recid)
        .then(successfulRequest, erroredRequest)
        .finally(clearRequest);

      function successfulRequest(response) {
        vm.exportContent = response.data
        console.log("Succesful");
      }

      function erroredRequest(data) {
        console.log("Error request");
        console.log(data);
      }

      function clearRequest() {
        vm.loading = false;
      }
    }

    $scope.$watch("vm.exportFormat", onExportFormatChanged);
   
  }

  modalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'exportAPI']

  angular.module('citemodal.controllers', [])
    .controller('modalInstanceCtrl', modalInstanceCtrl);

})(angular);

(function(angular) {

// Directives

  function inspireCiteModal($uibModal) {

    function link(scope, element, attrs) {
      scope.recid = attrs.recid;

      scope.open = function (size) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: attrs.bodyTemplate,
          size: size,
          bindToController: true, // Allows controller to access, e.g close function
          controller: 'modalInstanceCtrl',
          controllerAs: 'vm',
          scope: scope
        });
      };
    }

    function templateUrl(element, attrs) {
      return attrs.buttonTemplate;
    }

    return {
        templateUrl: templateUrl, // Button that will trigger the modal
        restrict: 'E',
        scope: false,
        link:link
      };
  }

  inspireCiteModal.$inject = ['$uibModal'];

  angular.module('citemodal.directives', [])
    .directive('inspireCiteModal', inspireCiteModal);

})(angular);

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