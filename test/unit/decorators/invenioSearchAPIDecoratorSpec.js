/*
 * This file is part of INSPIRE.
 * Copyright (C) 2016 CERN.
 *
 * INSPIRE is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * INSPIRE is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with INSPIRE; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

'use strict';

describe('Testing invenioSearchAPI decorator', function() {

  var $controller;
  var $httpBackend;
  var $rootScope;
  var ctrl;
  var scope;

  beforeEach(angular.mock.module('invenioSearch'));
  beforeEach(angular.mock.module('inspirehepSearch'));

  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$controller_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    var response = {
      data: {
        links: {
          self: 'http://iron.man/?sort=-title&size=10&page=1'
        }
      }
    };
    $httpBackend.whenGET('/api?page=1&size=20').respond(200, response);

    scope = $rootScope;
    ctrl = $controller('invenioSearchController', {
      $scope : scope,
    });
  }));

  it('should make a request with custom headers', function() {

    $httpBackend.expectGET('/api?page=1&size=20', {'Accept': 'application/vnd+inspire.brief+json'});

    ctrl.invenioSearchCurrentArgs.url = '/api';
    ctrl.invenioSearchCurrentArgs.params = {
      page: 1,
      size: 20
    };

    ctrl.invenioDoSearch();
    $httpBackend.flush();
  });

});