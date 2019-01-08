'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(document).ready(function () {

  function menuMobFunc(el) {
    this.el = el;
    this._init();
  }
  menuMobFunc.prototype._init = function () {
    this.iconMob = this.el.find('.mob-i-func');
    this.menuUl = this.el.find('.menu-ul');
    this.alturaUl = this.menuUl.height();
    this.alturaEl = this.el.height();
    this.li = this.menuUl.find('li');

    this.liSearch = this.el.find('.li-search');
    this.iconSearch = this.liSearch.find('img');
    this.inputSearch = this.liSearch.find('.input-search');
    this.formSearch = this.liSearch.find('.search-hidden-func');

    this.SubMenuLi = this.el.find('.sub-menu .set');

    this._initEvents();

    this.debugClick = true;
    this.debugClickSubMenu = true;
    this.clickSerchDebug = true;
  };
  menuMobFunc.prototype._initEvents = function () {
    var self = this;

    //Quando o ícone for clicado inicia a função slideTogle, a menos que o debugClick for false, este debug foi criado para impedir muitos clicques e pau por conta disso
    this.iconMob.on('click', function (e) {
      e.preventDefault();
      if (self.debugClick) {
        self._startMenuMobile();
      }
    });

    //Submenu Mobile
    this.SubMenuLi.on('click', function (e) {
      e.preventDefault();
      if (self.debugClickSubMenu) {
        self._startSubMenu(this);
      }
    });

    //Animação IconSearch
    this.formSearch.on('mouseenter', function (e) {
      self._startSearch(e);
    }).on('click', function (e) {
      self._startSearch(e);
    }).on('mouseleave', function (e) {
      self._startSearch(e);
    });
    //Debug close Search
    $(window).on('click', function (e) {
      var targ = $(e.target).attr('class');
      if (!self.formSearch.hasClass('no-active') && !self.inputSearch.val().length && (targ == 'menu-principal' || targ.indexOf('slide') == 0)) {
        self.inputSearch.css('width', '0px');
        self.formSearch.addClass('no-active');
        self.clickSerchDebug = true;
      }
    });

    this._debugResize();
  };
  menuMobFunc.prototype._debugResize = function () {
    var self = this;
    var windowWidth = $(window).outerWidth();

    $(window).resize(function () {

      //Apaga body e manda recarregar página
      windowResizeWidth = $(this).outerWidth();

      if (windowWidth < 992 && windowResizeWidth > 992) {
        $('body').fadeTo(300, '0');
        window.location.reload();
      }
      if (windowWidth > 992 && windowResizeWidth < 992) {
        $('body').fadeTo(300, '0');
        window.location.reload();
      }

      //Se o menu mob estiver ativo, desativa
      if (!self.menuUl.hasClass('no-active')) {
        //Passa em cada li e faz um efeito de desaparecer
        self.li.each(function () {
          $(this).animate({
            opacity: 0,
            left: '-30px'
          }, 300);
        });

        //Aguarda 300 segundos que é para as Li's sumirem e faz um efeito para diminuir o tamanho da div pai
        setTimeout(function () {
          self.el.animate({
            height: self.alturaEl + 43
          }, 400, function () {
            //Dá display none  
            self.menuUl.css('display', 'none');
          });

          //Remove os submenus que estiverem ativos (para não dar bug)
          self.li.each(function () {
            if ($(this).hasClass('sub-menu') && !$(this).hasClass('no-active')) {
              $(this).addClass('no-active');
              $(this).find('ul').slideToggle();
              self.debugClickSubMenu = true;
            }
          });
        }, 300);

        //Altera o ícone
        self.iconMob.fadeTo(600, '0', function () {
          //Debug de tamanho
          self.iconMob.find('img').css('transform', 'scale(1)');
          //Animação
          self.iconMob.find('img').attr('src', 'img/svg/menu-hamb.svg');
          self.iconMob.fadeTo(300, '1');
        });

        //Adiciona "no-active" para indicar que o efeito não está aparente
        self.menuUl.addClass('no-active');
      }
    });
  };
  menuMobFunc.prototype._startSearch = function (e) {
    if (e.originalEvent.type == 'click') {
      this.formSearch.removeClass('no-active');
      this.clickSerchDebug = false;
    } else {
      if (this.formSearch.hasClass('no-active')) {
        this.inputSearch.css('width', '200px');
        this.formSearch.removeClass('no-active');
      } else {
        if (!this.inputSearch.val().length && this.clickSerchDebug) {
          this.inputSearch.css('width', '0px');
          this.formSearch.addClass('no-active');
        }
      }
    }
  };
  menuMobFunc.prototype._startSubMenu = function (el) {
    var self = this;
    var ulHeight = $(el).siblings('ul').height();
    //Impede outros clicks (debug)
    this.debugClickSubMenu = false;

    //Se não estiver ativo inicia
    if ($(el).parent('li.sub-menu').hasClass('no-active')) {
      //Aumenta a div pai
      this.el.animate({
        height: this.el.outerHeight() + ulHeight + 10
      }, 300);
      //Remove a classe que indica ativo
      $(el).parent('li.sub-menu').removeClass('no-active');
      //Faz um slideTogle no item
      $(el).siblings('ul').slideToggle();
    }
    //Caso estiver ativo remove
    else {
        //Diminui o tamanho da div pai
        this.el.animate({
          height: this.el.outerHeight() - ulHeight - 10
        }, 300);
        //Adiciona uma classe indicando que não está mais ativo
        $(el).parent('li.sub-menu').addClass('no-active');
        //Faz um slideTogle no item
        $(el).siblings('ul').slideToggle();
      }
    //Libera outro click (debug)
    setTimeout(function () {
      self.debugClickSubMenu = true;
    }, 500);
  };
  menuMobFunc.prototype._startMenuMobile = function () {
    var self = this;
    this.debugClick = false;

    //Se não tiver a classe "no-active" inicia a função
    if (this.menuUl.hasClass('no-active')) {

      //Altera o ícone
      this.iconMob.fadeTo(600, '0', function () {
        //Debug de tamanho
        self.iconMob.find('img').css('transform', 'scale(0.75)');
        //Animação
        self.iconMob.find('img').attr('src', 'img/svg/cancel.svg');
        self.iconMob.fadeTo(600, '1');
      });

      //Anima o aumento da div pai, onde está o background
      this.el.animate({
        height: this.el.height() + this.alturaUl + 40
      }, 400, function () {

        //Da display Block
        self.menuUl.css('display', 'block');
        //Cria um timing para cada li, fazendo um efeito cascata de aparecer
        timingLi = 0;
        //Passa em cada li e faz a animação
        self.li.each(function () {
          timingLi = timingLi + 100;
          $(this).animate({
            opacity: 1,
            left: '0px'
          }, timingLi);
        });
      });

      //Remove a classe no active, já que o efeito está aparente
      this.menuUl.removeClass('no-active');
    }
    // Caso o menu estiver aparente
    else {
        //Passa em cada li e faz um efeito de desaparecer
        self.li.each(function () {
          $(this).animate({
            opacity: 0,
            left: '-30px'
          }, 300);
        });

        //Aguarda 300 segundos que é para as Li's sumirem e faz um efeito para diminuir o tamanho da div pai
        setTimeout(function () {
          self.el.animate({
            height: self.alturaEl + 43
          }, 400, function () {
            //Dá display none  
            self.menuUl.css('display', 'none');
          });

          //Remove os submenus que estiverem ativos (para não dar bug)
          self.li.each(function () {
            if ($(this).hasClass('sub-menu') && !$(this).hasClass('no-active')) {
              $(this).addClass('no-active');
              $(this).find('ul').slideToggle();
              self.debugClickSubMenu = true;
            }
          });
        }, 300);

        //Altera o ícone
        this.iconMob.fadeTo(600, '0', function () {
          //Debug de tamanho
          self.iconMob.find('img').css('transform', 'scale(1)');
          //Animação
          self.iconMob.find('img').attr('src', 'img/svg/menu-hamb.svg');
          self.iconMob.fadeTo(300, '1');
        });

        //Adiciona "no-active" para indicar que o efeito não está aparente
        this.menuUl.addClass('no-active');
      }

    //Libera outro click no botão que havia sido impedido pelo debug
    setTimeout(function () {
      self.debugClick = true;
    }, 600);
  };

  new menuMobFunc($('.menu-principal'));

  var slideShowFunc = function () {
    function slideShowFunc(el) {
      _classCallCheck(this, slideShowFunc);

      this.el = el;

      //Váriaveis do slide
      this.bannerContent = this.el.find('.content-banner');
      this.slide = this.el.find('.slide');
      this.slideActive = this.el.find('.slide.active');

      //Váriaveis arrow e balls
      this.arrow = this.el.find('.arrow');
      this.contentBalls = this.el.find('.content-balls');

      //Váriaveis de apoio: contador de slide, e número total de slide
      this.numberSlides = this.slide.length;
      this.countSlide = 0;

      //Debug: click (libera o click)
      this.debugClick = true;

      self = this;

      this._init();
    }

    _createClass(slideShowFunc, [{
      key: '_init',
      value: function _init() {
        var _this = this;

        // 1 - Inícia os balls automáticamente
        this._ballsStart();

        // 2 - Chama o loop
        this._startSlideLoop();

        // 3 - Para o loop com mouseenter
        this.el.on('mouseenter', function () {
          clearInterval(_this.loop);
        }).on('mouseleave', function () {
          clearInterval(_this.loop);
          _this._startSlideLoop(_this.countSlide);
        });

        // 4 - Passa o slide com next ou before
        this.arrow.each(function () {
          var _this2 = this;

          $(this).on('click', function () {

            if (self.debugClick) {
              if ($(_this2).hasClass('ar-left')) {
                self._leftArrowFunc();
              } else {
                self._rightArrowFunc();
              }
            }
          });
        });

        // 5 - Debug
        this._debug();
      }
    }, {
      key: '_debug',
      value: function _debug() {
        var _this3 = this;

        //Quando mudar de aba limpa o loop
        $(window).blur(function () {
          clearInterval(_this3.loop);
        });
      }
    }, {
      key: '_ballsStart',
      value: function _ballsStart() {
        var _this4 = this;

        //Adiciona os balls automaticamente
        this.slide.each(function (i, el) {
          _this4.contentBalls.append('<li class="ball-slide ball-' + i + '"></li>');
        });
        //Adiciona a classe "Active" no primeiro
        $('.ball-slide:first-child').addClass('active');

        //Ativa o evento de click em todos os balls
        this.balls = this.el.find('.ball-slide');
        this.balls.each(function () {

          $(this).on('click', function (e) {
            e.preventDefault();

            if (self.debugClick) {
              // 1.1 - Muda slide ao clicar no ball
              self._clickBall(this);
            }
          });
        });
      }
    }, {
      key: '_changeBall',
      value: function _changeBall(item) {
        $('.ball-slide.active').removeClass('active');
        $(item).addClass('active');
      }
    }, {
      key: '_clickBall',
      value: function _clickBall(item) {
        var _this5 = this;

        this._changeBall(item);

        //Debug e váriaveis
        this.debugClick = false;
        var numeroItem = $(item).attr('class').substr(16, 1);

        var nextLi = $('.content-banner .slide-' + numeroItem);
        var activeLi = this.el.find('.slide.active');

        // Debug: realoca os elementos na posição necessária para fazermos o animate sem bugar
        this.slide.each(function () {
          if (!$(this).hasClass('active')) {
            $(this).css({
              left: '100%'
            });
          }
        });

        //Pega a próxima li e lança o animate
        nextLi.animate({
          left: '0px'
        }, 600);

        //Pega a li ativa e retira ela
        activeLi.animate({
          left: '-100%'
        }, 600);

        //Após o efeito organiza os dados para o próximo
        setTimeout(function () {

          activeLi.css({
            left: '100%'
          });

          activeLi.removeClass('active');
          nextLi.addClass('active');

          _this5.countSlide = numeroItem;

          _this5.debugClick = true;
        }, 650);
      }
    }, {
      key: '_leftArrowFunc',
      value: function _leftArrowFunc() {
        var _this6 = this;

        //Debug e váriaveis
        this.debugClick = false;
        this.countSlide++;

        var nextLi = this.countSlide == this.numberSlides ? this.el.find('.slide:first-child') : this.el.find('.slide.active').next();
        var activeLi = this.el.find('.slide.active');

        //ChangeBall Func
        var numeroSlide = nextLi.attr('class').substr(12, 1);
        var itemBall = $('.ball-' + numeroSlide);
        this._changeBall(itemBall);

        // Debug: realoca os elementos na posição necessária para fazermos o animate sem bugar
        this.slide.each(function () {
          if (!$(this).hasClass('active')) {
            $(this).css({
              left: '100%'
            });
          }
        });

        //Pega a próxima li e lança o animate
        nextLi.animate({
          left: '0px'
        }, 600);

        //Pega a li ativa e retira ela
        activeLi.animate({
          left: '-100%'
        }, 600);

        //Após o efeito organiza os dados para o próximo
        setTimeout(function () {

          activeLi.css({
            left: '100%'
          });

          activeLi.removeClass('active');

          if (_this6.countSlide == _this6.numberSlides) {
            _this6.el.find('.slide:first-child').addClass('active');
            _this6.countSlide = 0;
          } else {
            nextLi.addClass('active');
          }

          _this6.debugClick = true;
        }, 650);
      }
    }, {
      key: '_rightArrowFunc',
      value: function _rightArrowFunc() {
        var _this7 = this;

        //Debug e váriaveis
        this.debugClick = false;
        this.countSlide--;

        var nextLi = this.countSlide < 0 ? this.el.find('.slide:last-child') : this.el.find('.slide.active').prev();
        var activeLi = this.el.find('.slide.active');

        //ChangeBall Func
        var numeroSlide = nextLi.attr('class').substr(12, 1);
        var itemBall = $('.ball-' + numeroSlide);
        this._changeBall(itemBall);

        // Debug: realoca os elementos na posição necessária para fazermos o animate sem bugar
        this.slide.each(function () {
          if (!$(this).hasClass('active')) {
            $(this).css({
              left: '-100%'
            });
          }
        });

        //Pega a próxima li e lança o animate
        nextLi.animate({
          left: '0px'
        }, 600);

        //Pega a li ativa e retira ela
        activeLi.animate({
          left: '100%'
        }, 600);

        //Após o efeito organiza os dados para o próximo
        setTimeout(function () {

          activeLi.css({
            left: '-100%'
          });

          activeLi.removeClass('active');
          if (_this7.countSlide < 0) {
            _this7.el.find('.slide:last-child').addClass('active');
            _this7.countSlide = _this7.numberSlides - 1;
          } else {
            nextLi.addClass('active');
          }
          _this7.debugClick = true;
        }, 650);
      }
    }, {
      key: '_startSlideLoop',
      value: function _startSlideLoop() {
        var _this8 = this;

        var counter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        //váriaveis
        this.countSlide = counter;

        //Loop passa slide automático
        this.loop = setInterval(function () {

          _this8.countSlide++;

          var nextLi = _this8.countSlide == _this8.numberSlides ? _this8.el.find('.slide:first-child') : _this8.el.find('.slide.active').next();

          var activeLi = _this8.el.find('.slide.active');

          //ChangeBall Func
          var numeroSlide = nextLi.attr('class').substr(12, 1);
          var itemBall = $('.ball-' + numeroSlide);
          _this8._changeBall(itemBall);

          // Debug: realoca os elementos na posição necessária para fazermos o animate sem bugar
          _this8.slide.each(function () {
            if (!$(this).hasClass('active')) {
              $(this).css({
                left: '100%'
              });
            }
          });

          //Pega a próxima li e lança o animate
          nextLi.animate({
            left: '0px'
          }, 600);

          //Pega a li ativa e retira ela
          activeLi.animate({
            left: '-100%'
          }, 600);

          //Após o efeito organiza os dados para o próximo
          setTimeout(function () {

            activeLi.css({
              left: '100%'
            });

            activeLi.removeClass('active');

            if (_this8.countSlide == _this8.numberSlides) {
              _this8.el.find('.slide:first-child').addClass('active');
              _this8.countSlide = 0;
            } else {
              nextLi.addClass('active');
            }
          }, 650);
        }, 3000);
      }
    }]);

    return slideShowFunc;
  }();

  new slideShowFunc($('.banner-slide'));

  var bannerSecond = function () {
    function bannerSecond(el, option) {
      _classCallCheck(this, bannerSecond);

      this.el = el;
      this.option = option;

      this.itens = this.el.querySelectorAll('.item');
      this.widthItem = this.el.querySelector('.item:first-child').offsetWidth;

      this.contentBanner = this.el.querySelector('.content-banner');
      this.arrowLeft = this.el.querySelector('.ar-left');
      this.arrowRight = this.el.querySelector('.ar-right');
      this.lastItem = this.el.querySelector('.item:last-child');
      this.firstItem = this.el.querySelector('.item:first-child');

      this.marginRight = this.option.margin;
      this.widthMargin = this.widthItem + this.marginRight;

      this.minLeft = 0;

      this.windowWidth = window.innerWidth;
      this.breakMobile = this.windowWidth < 768;
      this.breakTab = this.windowWidth < 992;
      this.breakDesk = this.windowWidth < 1170;
      this.breakDeskMask = this.windowWidth > 1170;

      this._init();
    }

    _createClass(bannerSecond, [{
      key: '_init',
      value: function _init() {
        var _this9 = this;

        this._organiza();
        this._debug();

        this.arrowLeft.addEventListener('click', function () {
          _this9._startFunc('left');
        });
        this.arrowRight.addEventListener('click', function () {
          _this9._startFunc('right');
        });
      }
    }, {
      key: '_organiza',
      value: function _organiza() {
        var _this10 = this;

        var marginLeft = this.widthItem + this.marginRight;

        this.itens.forEach(function (el, i) {
          if (i == 0) {
            marginLeft = 0;
          }
          el.style.left = marginLeft + 'px';
          marginLeft = marginLeft + _this10.widthItem + _this10.marginRight;
        });

        this.maxLeft = parseInt(this.el.querySelector('.item:last-child').style.left);
      }
    }, {
      key: '_debug',
      value: function _debug() {
        var _this11 = this;

        window.onresize = function (e) {
          _this11.windowWidth = window.innerWidth;
          _this11.breakMobile = _this11.windowWidth < 768;
          _this11.breakTab = _this11.windowWidth < 992;
          _this11.breakDesk = _this11.windowWidth < 1170;
          _this11.breakDeskMask = _this11.windowWidth > 1170;

          _this11._organiza();
        };
      }
    }, {
      key: '_defineCondition',
      value: function _defineCondition(lado) {
        var condMob = parseInt(this.lastItem.style.left) == 0 && lado == 'left' || parseInt(this.lastItem.style.left) == this.maxLeft && lado == 'right';

        var condTab = parseInt(this.lastItem.style.left) == 283 && lado == 'left' || this.breakTab && parseInt(this.lastItem.style.left) == this.maxLeft && lado == 'right';

        var condDesk = parseInt(this.lastItem.style.left) == 566 && lado == 'left' || parseInt(this.lastItem.style.left) == this.maxLeft && lado == 'right';

        var condDeskMax = parseInt(this.lastItem.style.left) == 849 && lado == 'left' || parseInt(this.lastItem.style.left) == this.maxLeft && lado == 'right';

        if (this.breakMobile) {
          return condMob;
        } else if (this.breakTab) {
          return condTab;
        } else if (this.breakDesk) {
          return condDesk;
        } else {
          return condDeskMax;
        }
      }
    }, {
      key: '_startFunc',
      value: function _startFunc(lado) {
        var _this12 = this;

        this.itens.forEach(function (el) {
          if (_this12._defineCondition(lado)) {
            if (_this12.el.querySelector('.ar-off') != null) {
              _this12.el.querySelector('.ar-off').classList.remove('ar-off');
            }
            if (lado == 'right') {
              _this12.arrowRight.classList.add('ar-off');
            } else {
              _this12.arrowLeft.classList.add('ar-off');
            }
          } else {
            if (_this12.el.querySelector('.ar-off') != null) {
              _this12.el.querySelector('.ar-off').classList.remove('ar-off');
            }
            var elLeft = lado == 'left' ? parseInt(el.style.left) - _this12.widthMargin : parseInt(el.style.left) + _this12.widthMargin;

            el.style.left = elLeft + 'px';
          }
        });
      }
    }]);

    return bannerSecond;
  }();

  new bannerSecond(document.querySelector('.banner-home-func'), {
    margin: 20
  });

  var colapseSimple = function () {
    function colapseSimple(el, option) {
      _classCallCheck(this, colapseSimple);

      this.el = el;
      this.option = option;
      this.itemMenu = this.el.querySelectorAll('.col-menu .item');
      this.itemContent = this.el.querySelectorAll('.col-content .item');
      this.menuActive = this.el.querySelector('.col-menu li.active');
      this.contentActive = this.el.querySelector('.col-content .item.active');
      this.contentCol = this.el.querySelectorAll('.col-content');

      this._init();
    }

    _createClass(colapseSimple, [{
      key: '_init',
      value: function _init() {
        var _this13 = this;

        var self = this;

        this._organiza();

        this.itemMenu.forEach(function (el, i) {
          el.addEventListener('click', function (e) {
            e.preventDefault();
            self._startFunc(this);
          });
        });

        window.onresize = function () {
          _this13._debug();
        };
      }
    }, {
      key: '_debug',
      value: function _debug() {
        this._organiza();
      }
    }, {
      key: '_organiza',
      value: function _organiza() {
        var verificaTamanhoItens = 0;
        this.itemContent.forEach(function (el, i) {
          if (el.offsetHeight > verificaTamanhoItens) {
            verificaTamanhoItens = el.offsetHeight;
          }
        });
        this.contentCol[0].style.height = verificaTamanhoItens + 'px';
      }
    }, {
      key: '_startFunc',
      value: function _startFunc(elem) {
        this.menuActive.classList.remove('active');
        elem.classList.add('active');

        this.contentActive.classList.remove('active');
        var item = elem.getAttribute('class').split(' ')[1];
        this.el.querySelector('.col-content .' + item).classList.add('active');

        this.menuActive = this.el.querySelector('.col-menu li.active');
        this.contentActive = this.el.querySelector('.col-content .item.active');
      }
    }]);

    return colapseSimple;
  }();

  new colapseSimple(document.querySelector('.colapse-simple'), {});

  var contagemFunc = function () {
    function contagemFunc(el, option) {
      _classCallCheck(this, contagemFunc);

      this.el = el;
      this.option = option;

      this.elHeight = this.el.offsetHeight;
      this.offsetTop = this.el.offsetTop;
      this.endOffsetTop = this.offsetTop + this.elHeight / 2;
      this.windowHeight = window.innerHeight;

      this.itens = this.el.querySelectorAll('li .numero');

      this.active = false;

      this._init();
    }

    _createClass(contagemFunc, [{
      key: '_init',
      value: function _init() {
        var _this14 = this;

        window.onscroll = function (el, i) {
          _this14._startFunc();
        };
      }
    }, {
      key: '_startFunc',
      value: function _startFunc() {
        var scroll = window.pageYOffset + this.windowHeight;

        if (scroll > this.endOffsetTop) {
          if (this.active == false) {
            this._contagem();
          }
        }
      }
    }, {
      key: '_contagem',
      value: function _contagem() {
        this.active = true;
        this.itens.forEach(function (el, i) {
          var maxNumber = el.attributes[1].value;
          var numberAtual = parseInt(el.textContent);
          var velocity = void 0;

          switch (i) {
            case 0:
              velocity = 130;
              break;

            case 1:
              velocity = 15;
              break;

            case 2:
              velocity = 30;
              break;

            case 3:
              velocity = 85;
              break;
          }

          var loop = setInterval(function () {
            el.textContent = numberAtual++;

            if (el.textContent == maxNumber) {
              clearInterval(loop);
            }
          }, velocity);
        });
      }
    }]);

    return contagemFunc;
  }();

  new contagemFunc(document.querySelector('.contagem-sec'), {});
});