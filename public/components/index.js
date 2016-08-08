import angular from 'angular';
import indicator from './indicator';
import suggestions from './suggestions';

export default angular.module('components',[])
    .component('stockIndicator', indicator)
    .component('stockSuggestions', suggestions);