// Copyright 2015 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for the prediction algorithm registry service.
 */

describe('Prediction algorithm registry service', function() {
  beforeEach(module('oppia'));

  describe('Test prediction algorithm registry functions', function() {
    var registryService, predictionService;

    beforeEach(function() {
      module(function($provide) {
        $provide.factory('PredictionSampleService', [function() {
          return {
            predict: function(classifierData, answer) {
              return 1;
            }
          };
        }]);
      });
    });

    beforeEach(inject(function($injector) {
      registryService = $injector.get('PredictionAlgorithmRegistryService');
      predictionService = $injector.get('PredictionSampleService');

      registryService.setMapping({
        LDAStringClassifier: {
          v1: 'PredictionSampleService'
        }
      });
    }));

    it('should return correct prediction algorithm service.', function() {
      var algorithmId = 'LDAStringClassifier';
      var dataSchemaVersion = 1;
      var generatedPredictionService = registryService.getPredictionService(
        algorithmId, dataSchemaVersion);

      expect(generatedPredictionService.toString()).toEqual(
        predictionService.toString());
    });
  });
});
