import moduleName from '../name';

class BoardController{
  constructor() {

  }
}

angular.module(moduleName)
  .controller('boardController', [(...args) => {
    return new BoardController(...args);
  }]);