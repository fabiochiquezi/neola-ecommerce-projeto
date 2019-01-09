

  class menuMobFunc{
    constructor( el, option ){
      this.el = el;
      this.option = option;

      this.menuIcon = this.el.querySelector( '.icon-menu' );
      this.menu = this.el.querySelector('.menu-func');
      
      this._init();
    }

    _init(){
      let self = this;

      this.menuIcon.addEventListener('click', function(e){
        e.preventDefault();
        self._toggleMenu();
      });
    }
    _toggleMenu(){
      if(this.menu.classList.contains('active')){
        this.menu.classList.remove('active');
      }
      else{
        this.menu.classList.add('active');
      }
    }
  }
  
  new menuMobFunc( document.querySelector( '.header-temp' ), {} );


