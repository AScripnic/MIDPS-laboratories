import moduleName from '../name';
import contentTableTemplate from '../views/content-table.html';

class ContentTableDirective{
  constructor($state) {
    this.state = $state;
    this.categories = {
      politics: {
        national: 'n',
        external: 'e'
      },
      interesets: {
        'video games': 'v',
        'sports': 'sports'
      }
    };
  }

  /**
   * Go to specific state based on address
   * @param {String} boardId
   */
  openBoard(boardId) {
    this.state.go('board', {boardId});
  }
}

angular.module(moduleName)
  .directive('contentTable', () => {
    return {
      restrict: 'E',
      controller: ContentTableDirective,
      controllerAs: 'table',
      template: contentTableTemplate
    };
  });