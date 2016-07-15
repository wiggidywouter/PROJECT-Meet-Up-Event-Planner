/* Create account page component */

var CreateAccountPage = Vue.extend({

  name: 'CreateAccountPage',

  template:'#create-account-page-template',

  data: function () {

    return {
      pageName: 'Create Account Page',
      steps: ['Create your account','Choose a password','Complete your profile'],
      progress: 0,
      activeStep: ''
    };

  },

  components: {
    'page': Page,
    'account-section': AccountSection,
    'steps-menu': StepsMenu,
    'multi-step-form': MultiStepForm
  },

  ready: function () {

    this.activeStep = this.steps[0];
  
  }

});
