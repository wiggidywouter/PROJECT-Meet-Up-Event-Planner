/* AccountSection component */

var AccountSection = Vue.extend({

  name: 'AccountSection',
  
  template: '#account-section',

  props: ['activeUser', 'isLoggedIn'],

  computed: {

    isRegistering: function () {
      return this.$route.path === '/create-account';
    }

  }

});