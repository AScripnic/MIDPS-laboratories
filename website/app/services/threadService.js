import moduleName from '../name';

import { ThreadPreviewModel } from '../models/ThreadPreviewModel';

class ThreadService {
  constructor(upload, http) {
    this.upload = upload;
    this.http = http;
  }

  /**
   * Create a new thread
   * @param {Object} file
   * @param {Object} formData
   * @param {Function} progressUpdater
   * @returns {Promise}
   */
  createThread(file, formData, progressUpdater = () => {}) {
    return this.upload.upload({
      url: '/api/thread',
      data: angular.extend({thread_image: file}, formData)
    }).then(
      () => Promise.resolve(),
      (error) => Promise.reject(error),
      (env) => progressUpdater(env)
    );
  }

  /**
   * Create a new post
   * @param {Object} file
   * @param {Object} formData
   * @param {Number} threadId
   * @param {Function} progressUpdater
   * @returns {Promise}
   */
  createPost(file, formData, threadId, progressUpdater = () => {}) {
    return this.upload.upload({
      url: '/api/post',
      data: angular.extend({post_image: file}, formData, {threadId})
    }).then(
      () => Promise.resolve(),
      (error) => Promise.reject(error),
      (env) => progressUpdater(env)
    );
  }

  /**
   * Return last active threads
   * @param {String} boardId
   * @returns {Promise}
   */
  getLastActiveThreads(boardId) {
    return this.http.get(`/api/board/${boardId}`)
      .then(response => response.data.map(el => new ThreadPreviewModel(el)));
  }

  /**
   * Get all thread's posts
   * @param {Number} threadId
   * @returns {Promise}
   */
  getPosts(threadId) {
    return this.http.get(`/api/thread/${threadId}`)
      .then(response => [new ThreadPreviewModel(response.data)]);
  }
}

angular.module(moduleName)
  .service('threadService', ['Upload', '$http', (...args) => {
    return new ThreadService(...args);
  }]);