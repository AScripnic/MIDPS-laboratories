import moduleName from '../name';

import homeTemplate from '../views/home.html';
import boardTemplate from '../views/board.html';

let states = [
  {
    controller: 'homeController',
    controllerAs: 'home',
    name: 'home',
    url: '',
    template: homeTemplate
  },
  {
    controller: 'boardController',
    controllerAs: 'boardCtrl',
    name: 'board',
    url: '/:boardId',
    template: boardTemplate
  },
  {
    controller: 'boardController',
    controllerAs: 'boardCtrl',
    name: 'thread',
    url: '/:boardId/:threadId',
    template: boardTemplate
  }
];

angular
  .module(moduleName)
  .config(function($stateProvider) {
    angular.forEach(states, (state) => {
      $stateProvider.state(state);
    });
  });