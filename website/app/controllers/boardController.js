import moduleName from '../name';
import { ThreadPreviewModel } from '../models/ThreadPreviewModel';

class BoardController{
  constructor($state, threadService) {
    this.state = $state;
    this.threadService = threadService;

    this.boards = ['n', 'e', 'v', 's'];
    this.onThreadPage = this.state.current.name !== 'board';
    this.onThreadPage ? this.getPosts() : this.getThreads();
  }

  /**
   * Get posts/threads if a new post/thread was created
   */
  onAdditionSucceed() {
    this.onThreadPage ? this.getPosts() : this.getThreads();
  }

  /**
   * Get specific thread's posts
   */
  getPosts() {
    this.threadService.getPosts(this.state.params.threadId)
      .then((threads) => {
        this.threadsPreview = threads;
      });
  }

  /**
   * Get last threads
   */
  getThreads() {
    this.threadService.getLastActiveThreads(this.state.params.boardId)
      .then((threads) => {
        this.threadsPreview = threads;
      });
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
  .controller('boardController', BoardController);