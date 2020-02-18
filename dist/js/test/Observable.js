"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Observable =
/*#__PURE__*/
function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this.listeners = {};
  }

  _createClass(Observable, [{
    key: "on",
    value: function on(e, callback) {
      if (this.listeners[e] == undefined) {
        this.listeners[e] = {};
        this.listeners[e].eventProperty = {};
        this.listeners[e].data = [];
      }

      this.listeners[e].data.push(callback);
    }
  }, {
    key: "emit",
    value: function emit(e, data) {
      if (this.listeners[e] == undefined || this.listeners[e].data == undefined) {
        return;
      }

      var itObj = this;
      this.listeners[e].data.forEach(function (listener) {
        listener(data);
      });
    }
  }]);

  return Observable;
}();

exports.Observable = Observable;