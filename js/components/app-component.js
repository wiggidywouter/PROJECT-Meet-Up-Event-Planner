/* Root component */

var App = Vue.extend({

  name: 'App',
  
  data: function() {

    return {
      activeUser: 'jane.doe@example.com',
      isLoggedIn: false
    };

  },

  ready: function () {

    this.$el.focus();

  },

  methods: {

    log: function(msg){
      console.log(msg);
    }

  },

  events: {

    'new-user': function(email) {
      this.activeUser = email;
      this.isLoggedIn = true;
    }
    
  }

});