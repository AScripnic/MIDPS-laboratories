import moduleName from '../name';
import threadPostTemplate from '../views/directives/thread-post.html'

class ThreadPost{
  constructor($state) {
    this.state = $state;
  }

  /**
   * Open a thread to see it's posts
   * @param {String} threadId
   * @param {Number} boardId
   */
  openThread(threadId, boardId) {
    this.state.go('thread', {
      boardId: boardId,
      threadId: threadId
    });
  }
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