'use strict';

let Loki = require('lokijs');

module.exports = class DBManager {
  constructor(callback) {
    this.postStartCallback = callback;
    this.db = new Loki(DBManager.DB_PATH ,
        {
          autosave : true,
          autoload: true,
          autoloadCallback: this.dbInitialized.bind(this)
        }
      );

  }

  /**
   * Post database initialization callback
   */
  dbInitialized() {
    this.threads = this.db.getCollection('threads') || this.db.addCollection('threads');

    this.postStartCallback();
  }

  /**
   * Get threads based on selected board
   * @param {String} board
   * @returns {Array}
   */
  getBoard(board) {
    return this.threads.where((obj) => {
      return obj.board === board;
    });
      
    //   .sort((a, b) => {
    //   if (a.updatedAt > b.updatedAt) {
    //     return 1;
    //   }
    //
    //   if (a.updatedAt < b.updatedAt) {
    //     return -1;
    //   }
    //
    //   return 0;
    // });
  }

  /**
   * Insert a new thread in DB
   * @param {Object} threadData
   * @param {Object} imageData
   */
  createThread(threadData, imageData) {
    let imageObj = {
      subject: threadData.subject,
      comment: threadData.comment,
      author: threadData.author || 'Anonymous',
      image: {
        previewLink: '',
        link: imageData.path,
        size: imageData.size,
        name: imageData.originalname
      },
      replies: []
    };

    this.threads.insert(imageObj);
  }

  /**
   * Start db instance
   * @param {Function} callback
   * @returns {DBManager}
   */
  static dbStart(callback) {
    return new DBManager(callback);
  }

  /**
   * @returns {String}
   */
  static get DB_PATH() {
    return './database/db.json';
  }
}

