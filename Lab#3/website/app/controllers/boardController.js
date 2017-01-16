import moduleName from '../name';

class BoardController{
  constructor($state) {
    this.state = $state;
    this.boards = ['n', 'e', 'v', 's'];
  }

  /**
   * Return if a slash should be shown in header
   * @param {Number} index
   * @returns {Boolean}
   */
  showSlash(index) {
    return index != this.boards.length - 1;
  }

  /**
   * Change board
   * @param {String} boardId
   */
  changeBoard(boardId) {
    this.state.go('board', {boardId});
  }
}

angular.module(moduleName)
  .controller('boardController', ['$state', (...args) => {
    return new BoardController(...args);
  }]);