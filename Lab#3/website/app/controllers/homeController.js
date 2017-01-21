import moduleName from '../name';

class HomeController {
  constructor() {}
}

angular.module(moduleName)
  .controller('homeController', [(...args) => {
    return new HomeController(...args);
  }]);