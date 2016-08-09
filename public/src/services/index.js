import angular from 'angular';
import stocksService from './stocks';
import suggestionService from './suggestions';

export default angular.module('services', [])
    .factory('stocksService', stocksService)
    .factory('suggestionService', suggestionService);