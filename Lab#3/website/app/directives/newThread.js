import moduleName from '../name';
import newThreadTemplate from '../views/directives/create-thread.html';

class NewThread {
  constructor(threadService) {
    this.threadService = threadService;

    this.isFormActive = false;
    this.threadData = {subject:'asdasd', comment:'asdasd'};
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
   * Create a thread
   */
  createThread() {
    if (!this.isDataValid) {
      alert('Please fill at least subject or comment information')
    }

    this.threadService.createThread(this.file, this.threadData).then(() => {
      this.isFormActive = false;
      alert('done');
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
      template: newThreadTemplate
    }
  }]);