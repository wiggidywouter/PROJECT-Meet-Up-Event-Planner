/* Steps menu component */

var StepsMenu = Vue.extend({

  name: 'StepsMenu',
 
  template: '#steps-menu',

  props:['activeStep', 'progress'],

  data: function () {

    return {
      steps: this.$root.$refs['activePage'].$data['steps']
    };

  },

  methods: {

    navigate: function (destination) {

      if(!this.isLocked(destination)){
        this.activeStep = destination;
      }

      var that = this;
      
      setTimeout(function () {

        that.$root.$refs['activePage'].$refs['multiStepForm'].$refs['activeForm'].setActiveInputs();
      
      }, 500);

    },

    isLocked: function (step) {
      
      return this.steps.indexOf(step) >= this.steps.indexOf(this.activeStep);

    },

    isActive: function (step) {

      return step === this.activeStep;

    }

  }

});