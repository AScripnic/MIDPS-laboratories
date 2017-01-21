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
   * Get all posts of an thread
   * @param {Number} id
   * @returns {Object}
   */
  getPosts(id) {
    return this.threads.get(id);
  }

  /**
   * Get threads based on selected board
   * @param {String} board
   * @returns {Array}
   */
  getBoardLastActiveThreads(board) {
    return this.threads
      .where((obj) => {
        return obj.board === board;
      })
      .sort((a, b) => {
        if (a.updatedAt < b.updatedAt) {
          return 1;
        }

        if (a.updatedAt > b.updatedAt) {
          return -1;
        }

        return 0;
      })
      .slice(0, 10)
      .map((el) => {
        el.repliesTotal = el.replies.length;
        el.imagesTotal = el.replies.filter(el => !!el.image).length;
        el.replies = el.replies
          .sort((a, b) => {
            if (a.timestamp < b.timestamp) {
              return 1;
            }

            if (a.timestamp > b.timestamp) {
              return -1;
            }

            return 0;
          }).slice(0, 3);

        return el;
      });
  }

  createPost(postData, imageData, previewPath) {
    let thread = this.threads.get(postData.threadId);
    let postObj = {
      comment: postData.comment,
      author: postData.author,
      timestamp: Date.now(),
      customId: `${thread.$loki}@${thread.replies.length}`
    };

    if (imageData && previewPath) {
      postObj.image = {
        previewLink: previewPath,
        link: imageData.path,
        size: imageData.size,
        name: imageData.originalname
      };
    }

    thread.updatedAt = Date.now();
    thread.replies.push(postObj);

    this.threads.update(thread);
  }

  /**
   * Insert a new thread in DB
   * @param {Object} threadData
   * @param {Object} imageData
   * @param {String} previewPath
   */
  createThread(threadData, imageData, previewPath) {
    let threadObj = {
      subject: threadData.subject,
      comment: threadData.comment,
      author: threadData.author || 'Anonymous',
      board: threadData.board,
      timestamp: Date.now(),
      image: {
        previewLink: previewPath,
        link: imageData.path,
        size: imageData.size,
        name: imageData.originalname
      },
      replies: [],
      updatedAt: Date.now()
    };

    this.threads.insert(threadObj);
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
};
