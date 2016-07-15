/* MultiStepForm component */

var MultiStepForm = Vue.extend({

  name: 'MultiStepForm',
 
  template: '#multi-step-form',

  props: ['activeStep','activeForm'],

  components: {
    'create-event': CreateEvent,
    'create-account': CreateAccount
  }

});