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
