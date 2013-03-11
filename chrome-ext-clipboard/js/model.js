/**
 * Model Class
 *
 * @author luics(luics.xu@gmail.com)
 * @date 2013-03-11
 */

define(['util'], function(util) {
    /**
     * Model
     *
     * @class
     * @constructor
     *
     * @param storage {Object} object with interface like LocalStorage
     */
    function Model(storage) {
        this._storage = storage;
        this._TMP_KEY = '__tmp_key';
    }


    /**
     * Set data to storage
     *
     * @private
     * @param key {string}
     * @param value {*}
     */
    Model.prototype.set = function(key, value) {
        console.log('set', key, value);
        this._storage.setItem(key, value);
    };

    /**
     * Get data from storage
     *
     * @private
     * @param key {string}
     * @return {string}
     */
    Model.prototype.get = function(key) {
        var value = this._storage.getItem(key);
        console.log('get', key, value);
        return value;
    };

    /**
     * Delete data from storage
     *
     * @private
     * @param key {string}
     */
    Model.prototype.del = function(key) {
        if (key === null || typeof key === 'undefined') {
            return;
        }
        
        this._storage.removeItem(key);
    };

    /**
     * Push a record
     *
     * @public
     * @param value {string}
     */
    Model.prototype.push = function(value) {
        var key = util.getUID();
        this.set(key, value);
    };

    /**
     * Get all records
     *
     * @public
     * @return {Object}
     */
    Model.prototype.getAll = function() {
        var len = this._storage.length;
        var records = {};
        for (var i = 0; i < len; i++) {
            var key = this._storage.key(i);
            if (this._TMP_KEY !== key) {
                records[key] = this.get(key);
            }
        }

        console.log('getAll', key, records);
        return records;
    };

    /**
     * Set temp record
     *
     * @public
     * @param value
     */
    Model.prototype.setTmp = function(value) {
        this.set(this._TMP_KEY, value);
    };

    /**
     * Get temp record
     *
     * @public
     * @return {string}
     */
    Model.prototype.getTmp = function() {
        var value = this.get(this._TMP_KEY);
        value = value ? value : '';
        return value;
    };

    return new Model(window.localStorage);
});
