import moment from 'moment';

export class PostModel {
  constructor(post) {
    angular.extend(this, post);
  }

  /**
   * Return custom timestamp
   * @returns {String}
   */
  get customTimestamp() {
    return moment(this.timestamp).format('DD/MM/YYYY(ddd)HH:MM:SS');
  }

  /**
   * @returns {Number}
   */
  get id() {
    return this.customId;
  }
}