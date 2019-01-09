'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var menuMobFunc = function () {
  function menuMobFunc(el, option) {
    _classCallCheck(this, menuMobFunc);

    this.el = el;
    this.option = option;

    this.menuIcon = this.el.querySelector('.icon-menu');
    this.menu = this.el.querySelector('.menu-func');

    this._init();
  }

  _createClass(menuMobFunc, [{
    key: '_init',
    value: function _init() {
      var self = this;

      this.menuIcon.addEventListener('click', function (e) {
        e.preventDefault();
        self._toggleMenu();
      });
    }
  }, {
    key: '_toggleMenu',
    value: function _toggleMenu() {
      if (this.menu.classList.contains('active')) {
        this.menu.classList.remove('active');
      } else {
        this.menu.classList.add('active');
      }
    }
  }]);

  return menuMobFunc;
}();

new menuMobFunc(document.querySelector('.header-temp'), {});