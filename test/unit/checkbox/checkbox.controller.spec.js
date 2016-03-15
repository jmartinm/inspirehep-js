// /*
//  * This file is part of INSPIRE.
//  * Copyright (C) 2016 CERN.
//  *
//  * INSPIRE is free software; you can redistribute it and/or
//  * modify it under the terms of the GNU General Public License as
//  * published by the Free Software Foundation; either version 2 of the
//  * License, or (at your option) any later version.
//  *
//  * INSPIRE is distributed in the hope that it will be useful, but
//  * WITHOUT ANY WARRANTY; without even the implied warranty of
//  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  * General Public License for more details.
//  *
//  * You should have received a copy of the GNU General Public License
//  * along with INSPIRE; if not, write to the Free Software Foundation, Inc.,
//  * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
//  *
//  * In applying this license, CERN does not
//  * waive the privileges and immunities granted to it by virtue of its status
//  * as an Intergovernmental Organization or submit itself to any jurisdiction.
//  */

describe('Controller: checkboxCtrl', function () {

  // beforeEach(angular.mock.module('export'));
  beforeEach(angular.mock.module('checkbox'));

  var $controller;
  var $httpBackend;
  var $rootScope;
  var ctrl;
  var scope;
  var modalInstance;
  var sandbox;
  var _exportRecords;

  beforeEach(inject(
    function (_$httpBackend_, _$rootScope_, _$controller_, exportRecords) {
      $controller = _$controller_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      scope = $rootScope;
      _exportRecords = exportRecords;

      scope.$parent = {}
      scope.$parent.vm = {}
      scope.$parent.vm.invenioSearchResults = {}
      scope.$parent.vm.invenioSearchResults.hits = {}
      scope.$parent.vm.invenioSearchResults.hits.hits = [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        }
      ]



      ctrl = $controller('checkboxCtrl', {
        $scope : scope,
        exportRecords: _exportRecords
      });

      console.log('hello')

      // Needed for scope.$digest() to work when using Controller-as syntax
      // scope.vm = ctrl;
    })
  );

  describe('Initial state', function () {
    it('should instantiate the controller properly', function () {
      expect(ctrl).to.not.be.undefined;
    });

  });

  describe('Toggling IDs', function () {
    it('should toggle an individual record id correctly', function () {

      scope.toggleId(123);

      expect(_exportRecords.getIdsToExport()).to.deep.equal([123]);

      scope.toggleId(123);

      expect(_exportRecords.getIdsToExport()).to.deep.equal([]);

    });

    it('should toggle all ids correctly', function () {

      expect(_exportRecords.getIdsToExport()).to.deep.equal([]);
      expect(scope.anyChecked()).to.be.equal(false);

      scope.toggleAllIds();

      expect(_exportRecords.getIdsToExport()).to.deep.equal([1, 2, 3]);
      expect(scope.anyChecked()).to.be.equal(true);
      expect(scope.isChecked(1)).to.be.equal(true);

      scope.toggleAllIds();

      expect(_exportRecords.getIdsToExport()).to.deep.equal([]);

    });
  })

  //   it('should send the appropriate request based on the selected format', function () {
      
  //     // Flush initial request
  //     $httpBackend.flush();

  //     $httpBackend.expectGET('/api/literature/?size=25&q=control_number:123', {
  //       'Accept': 'application/x-latexus'
  //     });

  //     ctrl.changeFormat('LaTex(US)');

  //     $httpBackend.flush();

  //     $httpBackend.expectGET('/api/literature/?size=25&q=control_number:123', {
  //       'Accept': 'application/x-latexeu'
  //     });

  //     ctrl.changeFormat('LaTex(EU)');

  //     // This allows $watch expressions to run- for 100% coverage
  //     scope.$digest();

  //     $httpBackend.flush();
  //   });

  //   it('should run error callback when there is an export error', function () {

  //     ctrl.recid = '500';

  //     $httpBackend.expectGET('/api/literature/?size=25&q=control_number:500', {
  //       'Accept': 'application/x-bibtex'
  //     });

  //     ctrl.loadFormat();

  //     $httpBackend.flush();
  //   });

  //   it('should work with multiple ids', function () {

  //     sandbox.stub(_exportRecords, 'getIdsToExport').returns(['123', '555']);

  //     ctrl.recid = undefined;

  //     $httpBackend.expectGET('/api/literature/?size=25&q=control_number:123+OR+control_number:555', {
  //       'Accept': 'application/x-bibtex'
  //     });

  //     ctrl.loadFormat();

  //     $httpBackend.flush();
      
  //     expect(_exportRecords.getIdsToExport.calledOnce).to.equal(true);
  //   });

  //   it('should download a given format', function () {

  //     $httpBackend.expectGET('/api/literature/?size=25&q=control_number:123', {
  //       'Accept': 'application/x-bibtex'
  //     });

  //     $httpBackend.flush();

  //     ctrl.downloadFormat();
  //   });


  // });

});