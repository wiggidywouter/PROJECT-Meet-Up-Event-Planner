// Router instance

var router = new VueRouter({});

// Defined routes

router.map({

  '/': {
    component: HomePage
  },

  '/create-event': {
    component: CreateEventPage
  },

  '/create-account': {
    component: CreateAccountPage
  }

});

router.beforeEach(function (transition) {
  
  window.scrollTo(0, 0);

  transition.next();
  
});

// Router init

router.start(App, '#app');


// Hide app untill load event

document.body.style.overflow = 'hidden';

window.onload = function() {

  document.getElementsByClassName('spinner')[0].style.display = 'none';
  
  document.getElementsByClassName('app')[0].style.opacity = 1;
  
  document.body.style.overflow = 'initial';

};


