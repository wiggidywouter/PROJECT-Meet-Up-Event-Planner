/* Create event (form) component */

var CreateEvent = Vue.extend({

  name: 'CreateEvent',
 
  template: '#create-event-form',

  props: ['activeStep'],

  mixins: [FormMixin],

  data: function () {

    return {
      plural: 'events',
      formData: {
        'event-name':'',
        'event-type':'',
        'event-host':'',
        'location':'',
        'start-date':'',
        'end-date':'',
        'invite-email':''
      },

      validityState: {
        'event-name': initValidState,
        'event-type': initValidState,
        'event-host': initValidState,
        'location': initValidState,
        'start-date': initValidState,
        'end-date': initValidState,
        'invite-email': initValidState
      },

      submitText: 'Submit your event',

      startDatePicker: null,

      endDatePicker: null

    };

  },

  methods: {

    logStuff:function (msg) {

      console.log('msg ' , msg);

    }

  },

  ready: function () {

    this.startDatePicker = rome(this.$els.startDate, {

      "appendTo": this.$els['startDatePickerHolder'],

      "dateValidator": rome.val.beforeEq(this.$els.endDate),

      "autoClose": false,

      "autoHideOnBlur": false,

      "autoHideOnClick": false,

      "inputFormat": "DD/MM/YYYY (HH:mm)",

      "invalidate": true,

      "max": null,

      "min": rome.moment(),

      "weekStart": 1

    });

    this.endDatePicker = rome(this.$els.endDate, {
      
      "appendTo": this.$els['endDatePickerHolder'],

      "dateValidator": rome.val.afterEq(this.$els.startDate),

      "autoClose": false,

      "autoHideOnBlur": false,

      "autoHideOnClick": false,

      "inputFormat": "DD/MM/YYYY (HH:mm)",

      "invalidate": true,

      "max": null,

      "min": rome.moment(),

      "weekStart": 1

    });

    var self = this;

    this.endDatePicker.once('show',function (e) {

      var startDateValue = self.startDatePicker.getDate();

      if (startDateValue){
        this.setValue( startDateValue );
      }

    });

    this.initPlacesAutocomplete();

  }

});