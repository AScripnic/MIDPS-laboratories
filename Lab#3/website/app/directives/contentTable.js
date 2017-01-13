import moduleName from '../name';

class ContentTableDirective{
  constructor() {
    this.categories = {
      politics: {
        national: 'n',
        external: '',
      }
    };
  }
}

angular.module(moduleName)
  .directive('contentTable', () => {
    return {
      restrict: 'E',
      controller: ContentTableDirective,
      controllerAs: 'table',
      template: '{{test}}'
    };
  });