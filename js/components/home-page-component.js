/* Home page component */

var HomePage = Vue.extend({

  name: 'HomePage',

  template:'#home-page-template',

  data: function () {
    return {
      pageName: 'Home Page',
      events: null,
      currentEvent: null,
      currentIndex: 0
    };
  },

  components: {
    'page': Page,
    'account-section': AccountSection,
    'event-display': EventDisplay
  },

  methods: {

    next: function () {

      if ( this.events[this.currentIndex + 1] ){

        this.currentIndex += 1;

      } else {

        this.currentIndex = 0;
      }
      
      this.currentEvent = this.events[this.currentIndex];

    },

    prev: function () {

      if ( this.currentIndex ){

        this.currentIndex -= 1;

      } else {

        this.currentIndex = this.events.length - 1;

      }
      
      this.currentEvent = this.events[this.currentIndex];

    },

    tapHandler: function (e) {

      var el = e.target.parentElement.parentElement;
      
      function animationEndhandler (e) {

        removeClass(this, 'animate');
        
        this.removeEventListener('animationend', animationEndhandler);
        
        this.removeEventListener('animationend', animationEndhandler);
        
        this.removeEventListener('webkitAnimationEnd', animationEndhandler);
        
        this.removeEventListener('oanimationend', animationEndhandler);
        
        this.removeEventListener('MSAnimationEnd', animationEndhandler);
      }
      
      el.addEventListener('animationend', animationEndhandler);
      
      el.addEventListener('webkitAnimationEnd', animationEndhandler);
      
      el.addEventListener('oanimationend', animationEndhandler);
      
      el.addEventListener('MSAnimationEnd', animationEndhandler);

      addClass(el, 'animate');
      
    }

  },

  created: function () {

    var initial = [
      {
        'event-name': 'Mystery land',
        'event-type': 'Dance festival',
        'event-host': 'Id&t',
        'location': 'Haarlemmermeer',
        'start-date': '08/26/2016',
        'end-date': '08/27/2016',
        'invite-email': []
      },
      {
        'event-name': 'Lowlands',
        'event-type': 'Music festival',
        'event-host': 'Lowlands B.V.',
        'location': 'Walibi Flevoland',
        'start-date': '07/26/2016',
        'end-date': '07/27/2016',
        'invite-email': []
      },
      {
        'event-name': 'Fast Forward Dance Parade',
        'event-type': 'Dance festival',
        'event-host': 'Fast Forward B.V.',
        'location': 'Havenkade Rotterdam',
        'start-date': '06/26/2016',
        'end-date': '06/27/2016',
        'invite-email': []
      }
    ];

    this.events = localStorage['events'] ? JSON.parse(localStorage['events']) : initial; // /this.events = ...
    
    localStorage['events'] = JSON.stringify(this.events);

    this.currentEvent = this.events[this.events.length - 1];

  }
  
});