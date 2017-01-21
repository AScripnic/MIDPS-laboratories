import moment from 'moment';
import { AbstractThread } from './AbstractThread';
import { PostModel } from './PostModel';

export class ThreadPreviewModel extends AbstractThread {
  constructor(...args) {
    super(...args);

    this.initializePosts();
  }

  /**
   * Initialize threads' posts
   */
  initializePosts() {
    this.posts = [];

    for (let post of this.replies) {
      this.posts.push(new PostModel(post));
    }
  }
}