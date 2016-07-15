/* Create account (form) component */

var CreateAccount = Vue.extend({
  
  name: 'CreateAccount',

  template: '#create-account-form',

  props: ['activeStep'],

  mixins: [FormMixin],

  data: function () {
    return {
      plural: 'users',
      users: null,
      formData: {
        'username':'',
        'email':'',
        'password':'',
        'password-retype':'',
        'location':'',
        'company':'',
        'job-title':'',
      },
      validityState: {
        'username':extend(initValidState,{
          usernameIsUnique: false
        }),
        'email':initValidState,
        'password':extend(initValidState,{
          hasNumber: false,
          hasCapitalLetter: false,
          hasSpecialCharacter: false
        }),
        'password-retype':extend(initValidState,{
          passwordsMatch: false
        }),
        'location':initValidState,
        'company':initValidState,
        'job-title':initValidState,
      },
      submitText: 'Finish and sign in'
    };

  },

  methods: {

    validateUsername: function (e) {

      if (this.users.indexOf(e.target.value) === -1){

        this.validityState['username'].usernameIsUnique = true;
      
        e.target.setCustomValidity('');
      
      } else {
      
        this.validityState['username'].usernameIsUnique = false;
      
        e.target.setCustomValidity('Username is already taken.');
      
      }

      this.updateValidityState(e);
    
    },

    validatePassword: function (e) {
      
      var val = e.target.value;

      if (val) {

        this.validityState['password'].hasNumber = /[0-9]/.test(val);
        
        this.validityState['password'].hasCapitalLetter = /[A-Z]/.test(val);
        
        var re = /[!"#$%&'()*+,\-.\/:;<=>?@[\\\]\^_`{\|}~]/;

        this.validityState['password'].hasSpecialCharacter = re.test(val);
        
        if (!this.validityState['password'].hasNumber || !this.validityState['password'].hasCapitalLetter || !this.validityState['password'].hasSpecialCharacter){
          
          e.target.setCustomValidity('Password should contain a number, capital letter and special character.');
        
        } else {
        
          e.target.setCustomValidity('');
        
        }

      } else {

        e.target.setCustomValidity('');
      
      } // if (val)

      this.updateValidityState(e);
    },

    validatePasswordRetype: function (e) {
      
      if (e.target.value === document.getElementsByName('password')[0].value ){
        
        this.validityState['password-retype'].passwordsMatch = true;
        
        e.target.setCustomValidity('');

      } else {

        this.validityState['password-retype'].passwordsMatch = false;
        
        e.target.setCustomValidity('Passwords don\'t match');
      
      }
      
      this.updateValidityState(e);

    }

  },

  events: {

    'save': function(plural, record) {

      this.$dispatch('new-user', record['email']);
    
    }

  },

  created: function() {

    this.users = localStorage[this.plural] ? JSON.parse(localStorage[this.plural]).map( function(user) { return user.username; }) : [];
  
  },

  ready: function () {
  
    this.initPlacesAutocomplete();
  
  }

});