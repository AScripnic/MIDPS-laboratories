import moduleName from '../name';

class HomeController {
  constructor() {
    this.testData = 'Hello Drakness';
  }
}

angular.module(moduleName)
  .controller('homeController', [(...args) => {
    return new HomeController(...args);
  }]);