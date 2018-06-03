import moment from 'moment';

export class AbstractThread {
  constructor(thread) {
    angular.extend(this, thread);
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
    return this.$loki;
  }

}