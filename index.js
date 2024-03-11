const Bluebird = require('bluebird');
const pRetry = require('p-retry');
const pTimeout = require('p-timeout');
const delay = require('delay');
const PQueue = require('p-queue').default;
const _ = require('lodash');
const axios = require('axios');

module.exports = {
  /**
   * Execute a promise with a timeout.
   * @param {Promise} promise The promise to execute.
   * @param {number} ms Timeout in milliseconds.
   * @param {string} [errorMessage='Promise timed out'] Timeout error message.
   * @returns {Promise} The promise with applied timeout.
   */
  withTimeout: function(promise, ms, errorMessage = 'Promise timed out') {
    return pTimeout(promise, ms, () => new Error(errorMessage));
  },

  /**
   * Retry a promise-returning function.
   * @param {Function} fn Function that returns a promise.
   * @param {object} options p-retry options.
   * @returns {Promise} The promise with retry mechanism.
   */
  withRetry: function(fn, options) {
    return pRetry(fn, options);
  },

  /**
   * Create a delayed promise.
   * @param {number} ms Delay in milliseconds.
   * @returns {Promise} The delayed promise.
   */
  delayPromise: function(ms) {
    return delay(ms);
  },

  /**
   * Run promises in sequence with a concurrency limit.
   * @param {Iterable<Function>} promiseFns Array or iterable of promise-returning functions.
   * @param {number} concurrency Concurrency limit.
   * @returns {Promise<Array>} A promise that resolves when all of the promises have resolved.
   */
  runInSequence: function(promiseFns, concurrency = 1) {
    const queue = new PQueue({concurrency});
    return Promise.all(promiseFns.map(fn => queue.add(fn)));
  },

  /**
   * Debounce a promise-returning function.
   * @param {Function} fn Function that returns a promise.
   * @param {number} wait The number of milliseconds to delay.
   * @returns {Function} The debounced function.
   */
  debouncePromise: function(fn, wait) {
    return _.debounce(fn, wait);
  },

  /**
   * Get JSON data from a URL with retries.
   * @param {string} url The URL to fetch.
   * @param {object} options Axios request options.
   * @param {number} retries Number of retries.
   * @returns {Promise} The promise with the JSON data.
   */
  fetchJsonWithRetry: function(url, options, retries) {
    return this.withRetry(() => axios.get(url, options).then(res => res.data), {retries});
  }
};
