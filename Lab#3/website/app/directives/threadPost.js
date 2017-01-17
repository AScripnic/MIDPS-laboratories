import moduleName from '../name';
import threadPostTemplate from '../views/directives/thread-post.html'

class ThreadPost{
  constructor() {}
}

angular.module(moduleName)
  .directive('threadPost', [() => {
    return {
      restrict: 'E',
      controller: ThreadPost,
      controllerAs: 'threadPostCtrl',
      template: threadPostTemplate,
      scope: {
        thread: '=post'
      }
    };
  }]);