/* Create event page component */

var CreateEventPage = Vue.extend({

  name: 'CreateEventPage',

  template:'#create-event-page-template',

  data: function () {

    return {
      pageName: 'Create Event Page',
      steps: ['Create your event', 'Set the details', 'Invite your friends'],
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