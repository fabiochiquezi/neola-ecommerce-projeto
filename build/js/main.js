$(document).ready(function(){
  
  function menuMobFunc (el){
    this.el = el;
    this._init();
  }
  menuMobFunc.prototype._init = function(){
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
  }
  menuMobFunc.prototype._initEvents = function(){
    var self = this;

    //Quando o ícone for clicado inicia a função slideTogle, a menos que o debugClick for false, este debug foi criado para impedir muitos clicques e pau por conta disso
    this.iconMob.on('click', function ( e ) {
      e.preventDefault();
      if(self.debugClick){
        self._startMenuMobile();
      }
    });

    //Submenu Mobile
    this.SubMenuLi.on('click', function(e){
      e.preventDefault();
      if(self.debugClickSubMenu){
        self._startSubMenu(this);
      }
    });

    //Animação IconSearch
    this.formSearch
    .on('mouseenter', function (e) { 
        self._startSearch(e);
    })
    .on('click', function (e) {  
      self._startSearch(e);
    })
    .on('mouseleave', function (e) {  
        self._startSearch(e);
    });
    //Debug close Search
    $(window).on('click', function(e){
      let targ = $(e.target).attr('class');
      if( !( self.formSearch.hasClass('no-active') ) && !(self.inputSearch.val().length) && (targ == 'menu-principal' || targ.indexOf('slide') == 0 )){
        self.inputSearch.css('width', '0px');
        self.formSearch.addClass('no-active');  
        self.clickSerchDebug = true;  
      }
    })

    this._debugResize()
  }
  menuMobFunc.prototype._debugResize = function(){
    var self = this;
    var windowWidth = $(window).outerWidth();

    $(window).resize(function(){

      //Apaga body e manda recarregar página
      windowResizeWidth = $(this).outerWidth();

      if(windowWidth < 992 && windowResizeWidth > 992){
        $('body').fadeTo(300, '0');
        window.location.reload();
      }
      if(windowWidth > 992 && windowResizeWidth < 992){
        $('body').fadeTo(300, '0');
        window.location.reload();
      }

      //Se o menu mob estiver ativo, desativa
      if(!(self.menuUl.hasClass('no-active'))){
          //Passa em cada li e faz um efeito de desaparecer
        self.li.each(function(){
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
          self.li.each(function(){
            if( $(this).hasClass('sub-menu') && !($(this).hasClass('no-active')) ){
              $(this).addClass('no-active');
              $(this).find('ul').slideToggle();
              self.debugClickSubMenu = true;
            }
          })
        }, 300);

        //Altera o ícone
        self.iconMob.fadeTo(600, '0', function(){
          //Debug de tamanho
          self.iconMob.find('img').css('transform', 'scale(1)');
          //Animação
          self.iconMob.find('img').attr('src', 'img/svg/menu-hamb.svg');
          self.iconMob.fadeTo(300, '1');
        });

        //Adiciona "no-active" para indicar que o efeito não está aparente
        self.menuUl.addClass('no-active');
      }
    })
  }
  menuMobFunc.prototype._startSearch = function (e) { 
    if(e.originalEvent.type == 'click'){
      this.formSearch.removeClass('no-active');      
      this.clickSerchDebug = false;
    }
    else{
      if(this.formSearch.hasClass('no-active')){
        this.inputSearch.css('width', '200px');
        this.formSearch.removeClass('no-active');
      }
      else{
        if(!(this.inputSearch.val().length) && this.clickSerchDebug){
          this.inputSearch.css('width', '0px');
          this.formSearch.addClass('no-active');  
        }
      }
    }

  }
  menuMobFunc.prototype._startSubMenu = function (el) {
    var self = this;
    var ulHeight = $(el).siblings('ul').height();
    //Impede outros clicks (debug)
    this.debugClickSubMenu = false;

    //Se não estiver ativo inicia
    if($(el).parent('li.sub-menu').hasClass('no-active')){
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
    else{
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
    setTimeout(function(){
       self.debugClickSubMenu = true;
    }, 500);
  }
  menuMobFunc.prototype._startMenuMobile = function(){
    var self = this;
    this.debugClick = false;

    //Se não tiver a classe "no-active" inicia a função
    if(this.menuUl.hasClass('no-active')){

      //Altera o ícone
      this.iconMob.fadeTo(600, '0', function(){
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
        self.li.each(function(){
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
    else{
      //Passa em cada li e faz um efeito de desaparecer
      self.li.each(function(){
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
        self.li.each(function(){
          if( $(this).hasClass('sub-menu') && !($(this).hasClass('no-active')) ){
            $(this).addClass('no-active');
            $(this).find('ul').slideToggle();
            self.debugClickSubMenu = true;
          }
        })
      }, 300);

      //Altera o ícone
      this.iconMob.fadeTo(600, '0', function(){
        //Debug de tamanho
        self.iconMob.find('img').css('transform', 'scale(1)');
        //Animação
        self.iconMob.find('img').attr('src', 'img/svg/menu-hamb.svg');
        self.iconMob.fadeTo(300, '1');
      });

      //Adiciona "no-active" para indicar que o efeito não está aparente
      this.menuUl.addClass('no-active')
    }

    //Libera outro click no botão que havia sido impedido pelo debug
    setTimeout(function(){
      self.debugClick = true;
    }, 600);
  }
  
  new menuMobFunc ( $('.menu-principal') );


  class slideShowFunc{
    constructor(el){
      this.el = el;

      //Váriaveis do slide
      this.bannerContent = this.el.find( '.content-banner' ); 
      this.slide = this.el.find( '.slide' );
      this.slideActive = this.el.find( '.slide.active' );
      
      //Váriaveis arrow e balls
      this.arrow = this.el.find( '.arrow' );
      this.contentBalls = this.el.find( '.content-balls' );

      //Váriaveis de apoio: contador de slide, e número total de slide
      this.numberSlides = this.slide.length;
      this.countSlide = 0;

      //Debug: click (libera o click)
      this.debugClick = true;

      self = this;

      this._init();
    }
    _init(){
      // 1 - Inícia os balls automáticamente
      this._ballsStart();

      // 2 - Chama o loop
      this._startSlideLoop();

      // 3 - Para o loop com mouseenter
      this.el
      .on('mouseenter', () => {
        clearInterval( this.loop )
      })
      .on('mouseleave', () =>{
        clearInterval( this.loop )
        this._startSlideLoop( this.countSlide );
      })

      // 4 - Passa o slide com next ou before
      this.arrow.each(function(){
        $( this ).on('click', () => {

          if(self.debugClick){
            if( $( this ).hasClass( 'ar-left' ) ){
              self._leftArrowFunc();
            }
            else{
              self._rightArrowFunc();
            }
          }

        })
      });

      // 5 - Debug
      this._debug();
    }
    _debug(){

      //Quando mudar de aba limpa o loop
      $( window ).blur(() => {
        clearInterval( this.loop )
      });

    }
    _ballsStart(){

      //Adiciona os balls automaticamente
      this.slide.each( ( i, el ) => {
        this.contentBalls.append( `<li class="ball-slide ball-${i}"></li>` );
      });
      //Adiciona a classe "Active" no primeiro
      $( '.ball-slide:first-child' ).addClass( 'active' );

      //Ativa o evento de click em todos os balls
      this.balls = this.el.find( '.ball-slide' );
      this.balls.each(function(){

        $( this ).on('click', function ( e ) {
          e.preventDefault();

          if( self.debugClick ){
            // 1.1 - Muda slide ao clicar no ball
            self._clickBall( this );
          }
        });

      });
      
    }
    _changeBall(item){
      $('.ball-slide.active').removeClass('active');
      $(item).addClass('active');
    }
    _clickBall( item ){
      this._changeBall(item);

      //Debug e váriaveis
      this.debugClick = false;
      let numeroItem = $( item ).attr( 'class' ).substr( 16, 1 );

      let nextLi = $( `.content-banner .slide-${numeroItem}` );
      let activeLi = this.el.find( '.slide.active' );
    
      // Debug: realoca os elementos na posição necessária para fazermos o animate sem bugar
      this.slide.each( function(){
        if( !( $( this ).hasClass( 'active' ) )) {
          $( this ).css({
            left: '100%'
          })
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
      setTimeout( () => {

        activeLi.css({
          left: '100%'
        }); 
        
        activeLi.removeClass( 'active' );
        nextLi.addClass( 'active' );

        this.countSlide = numeroItem;
    
        this.debugClick = true;

      }, 650);
    }
    _leftArrowFunc(){

      //Debug e váriaveis
      this.debugClick = false;
      this.countSlide++;

      let nextLi = this.countSlide == this.numberSlides ? this.el.find( '.slide:first-child' ) : this.el.find( '.slide.active' ).next();
      let activeLi = this.el.find( '.slide.active' );

      //ChangeBall Func
      let numeroSlide = nextLi.attr('class').substr( 12, 1 );
      let itemBall = $(`.ball-${numeroSlide}`);
      this._changeBall(itemBall);

      // Debug: realoca os elementos na posição necessária para fazermos o animate sem bugar
      this.slide.each( function(){
        if( !( $( this ).hasClass( 'active' ) )) {
          $( this ).css({
            left: '100%'
          })
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
      setTimeout(() => {

        activeLi.css({
          left: '100%'
        }); 
        
        activeLi.removeClass( 'active' );
        
        if( this.countSlide == this.numberSlides ){
          this.el.find( '.slide:first-child' ).addClass( 'active' );
          this.countSlide = 0;
        }
        else{
          nextLi.addClass('active'); 
        }

        this.debugClick = true;

      }, 650);
    }
    _rightArrowFunc(){

      //Debug e váriaveis
      this.debugClick = false;
      this.countSlide--;

      let nextLi = this.countSlide < 0 ? this.el.find( '.slide:last-child' ) : this.el.find( '.slide.active' ).prev();
      let activeLi = this.el.find( '.slide.active' );

      //ChangeBall Func
      let numeroSlide = nextLi.attr('class').substr( 12, 1 );
      let itemBall = $(`.ball-${numeroSlide}`);
      this._changeBall(itemBall);

      // Debug: realoca os elementos na posição necessária para fazermos o animate sem bugar
      this.slide.each(function(){
        if( !( $( this ).hasClass( 'active' ) )) {
          $( this ).css({
            left: '-100%'
          })
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
      setTimeout( () => {

        activeLi.css({
          left: '-100%'
        }); 
        
        activeLi.removeClass( 'active' );
        if(this.countSlide < 0){
          this.el.find( '.slide:last-child' ).addClass( 'active' );
          this.countSlide = this.numberSlides - 1;
        }
        else{
          nextLi.addClass( 'active' ); 
        }
        this.debugClick = true;

      }, 650);      
    }
    _startSlideLoop(counter = 0){
      //váriaveis
      this.countSlide = counter;

      //Loop passa slide automático
      this.loop = setInterval( () => {

        this.countSlide++;

        let nextLi = this.countSlide == this.numberSlides ? this.el.find('.slide:first-child') : this.el.find('.slide.active').next();

        let activeLi = this.el.find('.slide.active');

        //ChangeBall Func
        let numeroSlide = nextLi.attr('class').substr( 12, 1 );
        let itemBall = $(`.ball-${numeroSlide}`);
        this._changeBall(itemBall);

        // Debug: realoca os elementos na posição necessária para fazermos o animate sem bugar
        this.slide.each(function(){
          if( !( $(this).hasClass('active') )) {
            $(this).css({
              left: '100%'
            })
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
        setTimeout(() => {

          activeLi.css({
            left: '100%'
          }); 
          
          activeLi.removeClass('active');

          if( this.countSlide == this.numberSlides ){
            this.el.find( '.slide:first-child' ).addClass( 'active' );
            this.countSlide = 0;
          }
          else{
            nextLi.addClass( 'active' ); 
          }

        }, 650);
      }, 3000);
    }

  }

  new slideShowFunc ( $('.banner-slide') );


  class bannerSecond{
    constructor(el, option){
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
    _init(){

      this._organiza();
      this._debug();

      this.arrowLeft.addEventListener('click', () => {
        this._startFunc('left');
      });
      this.arrowRight.addEventListener('click', () => {
        this._startFunc('right');
      });
      
    }
    _organiza(){
      let marginLeft = this.widthItem + this.marginRight;

      this.itens.forEach((el, i) =>{
        if(i == 0){
          marginLeft = 0;
        }
        el.style.left = `${marginLeft}px`;
        marginLeft = marginLeft + this.widthItem + this.marginRight;
      });

      this.maxLeft = parseInt(this.el.querySelector('.item:last-child').style.left);
    }
    _debug(){
      window.onresize = (e) =>{
        this.windowWidth = window.innerWidth;
        this.breakMobile = this.windowWidth < 768;
        this.breakTab = this.windowWidth < 992;
        this.breakDesk = this.windowWidth < 1170;
        this.breakDeskMask = this.windowWidth > 1170;

        this._organiza();
      }
    }
    _defineCondition(lado){
      let condMob = parseInt(this.lastItem.style.left) == 0 && lado == 'left' || parseInt(this.lastItem.style.left) == this.maxLeft && lado == 'right';

      let condTab = parseInt(this.lastItem.style.left) == 283 && lado == 'left' || this.breakTab && parseInt(this.lastItem.style.left) == this.maxLeft && lado == 'right';

      let condDesk = parseInt(this.lastItem.style.left) == 566 && lado == 'left' || parseInt(this.lastItem.style.left) == this.maxLeft && lado == 'right';

      let condDeskMax = parseInt(this.lastItem.style.left) == 849 && lado == 'left' || parseInt(this.lastItem.style.left) == this.maxLeft && lado == 'right';

      if(this.breakMobile){
        return condMob;
      }
      else if(this.breakTab){
        return condTab;
      }
      else if(this.breakDesk){
        return condDesk;
      }
      else{
        return condDeskMax;
      }
    }
    _startFunc(lado){
      this.itens.forEach((el) =>{
        if(this._defineCondition(lado)){
          if(this.el.querySelector('.ar-off') != null){
            this.el.querySelector('.ar-off').classList.remove('ar-off');
          }
          if(lado == 'right'){
            this.arrowRight.classList.add('ar-off')
          }
          else{
            this.arrowLeft.classList.add('ar-off')
          }
          
        }
        else{
          if(this.el.querySelector('.ar-off') != null){
            this.el.querySelector('.ar-off').classList.remove('ar-off');
          }
          let elLeft = lado == 'left' ? parseInt(el.style.left) - this.widthMargin : parseInt(el.style.left) + this.widthMargin;

          el.style.left = `${elLeft}px`;          
        }

      })
    }
  }

  new bannerSecond ( document.querySelector('.banner-home-func'), {
    margin: 20
  } );

  class colapseSimple{
    constructor(el, option){
      this.el = el;
      this.option = option;
      this.itemMenu = this.el.querySelectorAll('.col-menu .item');
      this.itemContent = this.el.querySelectorAll('.col-content .item');
      this.menuActive = this.el.querySelector('.col-menu li.active');
      this.contentActive = this.el.querySelector('.col-content .item.active');
      this.contentCol = this.el.querySelectorAll('.col-content');

      this._init();
    }
    _init(){

      let self = this;

      this._organiza();

      this.itemMenu.forEach((el, i) =>{
        el.addEventListener('click', function(e){
          e.preventDefault();
          self._startFunc(this);
        });
      })

      window.onresize = () => {
        this._debug();
      }
    }
    _debug(){
      this._organiza();
    }
    _organiza(){
      let verificaTamanhoItens = 0;
      this.itemContent.forEach( (el, i) => {
        if(el.offsetHeight > verificaTamanhoItens){
          verificaTamanhoItens = el.offsetHeight;
        }
      })
      this.contentCol[0].style.height = `${verificaTamanhoItens}px`;
    }
    _startFunc(elem){
      this.menuActive.classList.remove('active');
      elem.classList.add('active');

      this.contentActive.classList.remove('active');
      let item = elem.getAttribute('class').split(' ')[1];
      this.el.querySelector(`.col-content .${item}`).classList.add('active');

      this.menuActive = this.el.querySelector('.col-menu li.active');
      this.contentActive = this.el.querySelector('.col-content .item.active');
    }
  }

  new colapseSimple ( document.querySelector('.colapse-simple'), {});

  class contagemFunc{
    constructor(el, option){
      this.el = el;
      this.option = option;

      this.elHeight = this.el.offsetHeight;
      this.offsetTop = this.el.offsetTop;
      this.endOffsetTop = this.offsetTop + ( this.elHeight / 2);
      this.windowHeight = window.innerHeight;

      this.itens = this.el.querySelectorAll('li .numero');

      this.active = false;

      this._init();
    }
    _init(){
      window.onscroll = (el, i) => {  
        this._startFunc();
      }
    }
    _startFunc(){
      let scroll = window.pageYOffset + this.windowHeight;

      if( scroll > this.endOffsetTop){
         if(this.active == false){
          this._contagem();
         }
      }
    }
    _contagem(){
      this.active = true;
      this.itens.forEach((el, i) => {
        let maxNumber = el.attributes[1].value;
        let numberAtual = parseInt(el.textContent);
        let velocity;
        
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
        
        let loop = setInterval(() => {
          el.textContent = numberAtual++;

          if(el.textContent == maxNumber){
            clearInterval(loop);
          }

        }, velocity);
      })
    }
  }

  new contagemFunc ( document.querySelector('.contagem-sec'), {});

});
