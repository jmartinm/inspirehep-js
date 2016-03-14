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
