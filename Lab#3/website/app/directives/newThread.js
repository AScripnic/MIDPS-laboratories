import moduleName from '../name';
import newThreadTemplate from '../views/directives/create-thread.html';

class NewThread {
  constructor(threadService, $state, $scope) {
    this.threadService = threadService;
    this.scope = $scope;
    this.state = $state;

    this.isFormActive = false;
    this.threadData = {
      board: $state.params.boardId
    };
  }

  /**
   * Display new thread form
   */
  showForm() {
    this.isFormActive = true;
  }

  /**
   * Check if user completed the form
   * @returns {Boolean}
   */
  get isDataValid() {
    return !!(this.threadData.subject || this.threadData.comment);
  }

  /**
   * Create a post or a thread based on scope.createThread
   */
  create() {
    if (!this.isDataValid) {
      alert('Please fill at least subject or comment information')
    }

    this.scope.createThread ? this.createThread() : this.createPost();
  }

  /**
   * Create a post
   */
  createPost() {
    this.threadService.createPost(this.file, this.threadData, this.state.params.threadId).then(() => {
      this.isFormActive = false;
      this.scope.onSucceed();
    }).catch((error) => {
      alert('error');
      console.log(error);
    });
  }

  /**
   * Create a thread
   */
  createThread() {
    this.threadService.createThread(this.file, this.threadData).then(() => {
      this.isFormActive = false;
      this.scope.onSucceed();
    }).catch((error) => {
      alert('error');
      console.log(error);
    });
  }
}

angular.module(moduleName)
  .directive('newThread', [() => {
    return {
      restrict: 'E',
      controller: NewThread,
      controllerAs: 'newThreadCtrl',
      template: newThreadTemplate,
      scope: {
        onSucceed: '&',
        createThread: '='
      }
    }
  }]);