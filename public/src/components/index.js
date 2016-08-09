import angular from 'angular';
import indicator from './indicator';
import logo from './logo';
import suggestions from './suggestions';

export default angular.module('components', [])
    .component('stockIndicator', indicator)
    .component('stockLogo', logo)
    .component('stockSuggestions', suggestions);