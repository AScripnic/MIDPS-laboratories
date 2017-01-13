import moduleName from '../name';
import homePage from '../views/home.html';

let states = [
  {
    controller: 'homeController',
    controllerAs: 'home',
    name: 'home',
    url: '',
    template: homePage
  },
  {
    controller: 'boardController',
    controllerAs: 'board',
    name: 'board',
    url: '/:boardId',
    template: 'welcome to this board'
  }
];

angular
  .module(moduleName)
  .config(function($stateProvider) {
    angular.forEach(states, (state) => {
      $stateProvider.state(state);
    });
  });