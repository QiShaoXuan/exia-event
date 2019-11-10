(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('exia')) :
  typeof define === 'function' && define.amd ? define(['exia'], factory) :
  (global = global || self, global.exiaEvent = factory(global.exia));
}(this, (function (exia) { 'use strict';

  exia = exia && exia.hasOwnProperty('default') ? exia['default'] : exia;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var ExiaEvent = function ExiaEvent() {
    var _this = this;

    _classCallCheck(this, ExiaEvent);

    _defineProperty(this, "on", function (eventName, fn) {
      if (!_this.events.has(eventName)) {
        _this.events.set(eventName, []);
      }

      var handlers = _this.events.get(eventName);

      if (handlers.length >= _this.maxListener) {
        console.error("Too much has bind on ".concat(eventName, "."));
      } else {
        _this.events.set(eventName, handlers.push(fn));
      }

      return _this;
    });

    _defineProperty(this, "emit", function (eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!_this.hasOwnEvent(eventName)) {
        return _this;
      }

      var handlers = _this.events.get(eventName);

      handlers.forEach(function (handler) {
        if (args.length < 3) {
          handler.call.apply(handler, [_this].concat(args));
        } else {
          handler.apply(_this, args);
        }
      });
      return _this;
    });

    _defineProperty(this, "remove", function (eventName, fn) {
      if (!_this.hasOwnEvent(eventName)) {
        return _this;
      }

      var handlers = _this.events.get(eventName);

      var deletePosition = handlers.findIndex(function (handler) {
        return handler === fn;
      });

      if (deletePosition !== -1) {
        handlers.splice(deletePosition, 1);

        _this.events.set(handlers);
      }

      return _this;
    });

    _defineProperty(this, "removeAll", function (eventName) {
      if (!_this.hasOwnEvent(eventName)) {
        return _this;
      }

      return _this.events["delete"](eventName);
    });

    _defineProperty(this, "hasOwnEvent", function (eventName) {
      var isHas = _this.events.has(eventName);

      if (!isHas) {
        console.error("Has not bind ".concat(eventName, "."));
      }

      return isHas;
    });

    this.events = new Map();
    this.maxListener = 10;
  };

  exia.event = new ExiaEvent();
  var index = exia.event;

  return index;

})));
