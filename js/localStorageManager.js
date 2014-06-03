window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.tokenKey = "token";
  this.userKey = "user";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";
  var storage = window.localStorage;

  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

LocalStorageManager.prototype.removeAll = function () {
  this.storage.removeItem(this.tokenKey);
  this.storage.removeItem(this.userKey);
};

LocalStorageManager.prototype.getToken = function () {
  return this.storage.getItem(this.tokenKey) || 0;
};

LocalStorageManager.prototype.setToken = function (token) {
  this.storage.setItem(this.tokenKey, token);
};

LocalStorageManager.prototype.getUser = function () {
  return JSON.parse(this.storage.getItem(this.userKey)) || 0;
};

LocalStorageManager.prototype.setUser = function (user) {
  var jsonUser = JSON.stringify(user);
  this.storage.setItem(this.userKey, jsonUser);
};