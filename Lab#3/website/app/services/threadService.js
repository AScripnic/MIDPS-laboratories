import moduleName from '../name';

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
  createThread(file, formData, progressUpdater) {
    return this.upload.upload({
      url: '/api/thread',
      data: angular.extend({thread_image: file}, formData)
    }).then(
      () => Promise.resolve(),
      (error) => Promise.reject(error),
      (evt) => {console.log(parseInt(100.0 * evt.loaded / evt.total))}
    );
  }
}

angular.module(moduleName)
  .service('threadService', ['Upload', '$http', (...args) => {
    return new ThreadService(...args);
  }]);