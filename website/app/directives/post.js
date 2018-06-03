import moduleName from '../name';
import postTemplate from '../views/directives/post.html';

class Post {}

angular.module(moduleName)
  .directive('post', [() => {
    return {
      restrict: 'E',
      controller: Post,
      controllerAs: 'postCtrl',
      scope: {
        post: '='
      },
      template: postTemplate
    }
  }]);