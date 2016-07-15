// Form mixin

var FormMixin = {

  data: function(){

    return {
      inFocus: null,
      steps: this.$root.$refs['activePage'].$data['steps'],
      activeInputs: null
    };

  },

  computed: {

    nextStep: function () {

      var activeStepIndex = this.steps.indexOf(this.activeStep);
            
      if (activeStepIndex < this.steps.length - 1){

        return this.steps[activeStepIndex + 1];
      
      } else {
      
        return this.submitText;

      }
    } // /nextStep 
  },

  methods:{

    initPlacesAutocomplete: function() {

      if (window.google){
        
        var element = this.$els.location;

        // Create the autocomplete object, restricting the search to geographical location types.
        var autocomplete = new google.maps.places.Autocomplete(
            (element),
            {types: ['geocode']}
        );

        element.placeholder = '';
      
      }

    },

    updateValidityState: function(e){

      var val = e.target.value.trim();
      
      var toUpdate = ['patternMismatch','tooLong','tooShort','typeMismatch','valid','valueMissing'];
      
      var newState = e.target.validity;

      for (var index in toUpdate){
        this.validityState[e.target.name][toUpdate[index]] = newState[toUpdate[index]];
      }
      
      if (!e.target.validity['tooShort']){

        var minlength = +e.target.getAttribute('minlength');
        
        if (val.length < minlength) {
        
          e.target.setCustomValidity('Should be at least ' + minlength + ' characters long.');
          
          this.validityState[e.target.name]['tooShort'] = true;
        
        } else {

          var vMsg = e.target.validationMessage;

          var cErr = e.target.validity['customError'];
                    
          var newValidationMessage = (cErr && !vMsg.match(/characters long./)) ? vMsg : '';
        
          e.target.setCustomValidity(newValidationMessage);
          
          this.validityState[e.target.name]['tooShort'] = false;

        }
        

      }

      if (val === ''){

        this.validityState[e.target.name]['valueMissing'] = true;
      
      }

    },

    setInFocus: function(e){
      
      this.inFocus = e.target.name;
      
      this.updateValidityState(e);

    },

    setActiveInputs: function() {

      this.activeInputs = Array.prototype.slice.call( this.$els.form.getElementsByTagName('input') )
          .filter( function(node) {
            return !node.disabled;
          });

    },

    openCloseDatePickers: function (e) {
      
      var focused = e.target.name;
      
      var startDateIsOpen = (this.startDatePicker.container.style.display === 'inline-block');
      
      var endDateIsOpen = (this.endDatePicker.container.style.display === 'inline-block');
      
      if (focused == 'start-date') {

        this.endDatePicker.hide();

        if (!startDateIsOpen)

          this.startDatePicker.show();

      } else if (focused == 'end-date') {

        this.startDatePicker.hide();

        if (!endDateIsOpen)

          this.endDatePicker.show();

      } else {

          this.startDatePicker.hide();

          this.endDatePicker.hide();
      }

    
    },

    handleTabIndex: function (e) {

      if (!this.activeInputs){

        this.setActiveInputs();

      }

      var currentIndex = this.activeInputs.indexOf(document.getElementsByName(this.inFocus)[0]);
      
      if (currentIndex === -1){

        this.$els.submit.click();
        
        return false;
      
      }

      if(currentIndex < this.activeInputs.length - 1){
        
        this.activeInputs[currentIndex + 1].focus();
      
      } else {

        this.$els.submit.click();
  
      }
      
    
    },

    continue: function(){

      if (this.$els.form.checkValidity()){
        
        this.saveSection();

        if (this.activeStep == this.steps[this.steps.length - 1]) {
          
          this.save(function () {
             router.go({path:'/'});
          });
        
        } else {

          this.activeStep = this.nextStep;
          var self = this;
          setTimeout(function() {

            self.setActiveInputs();

            self.activeInputs[0].focus();

          }, 250);
        }
      }

    }, // /continue

    saveSection: function () {
      
      this.setActiveInputs();

      var self = this;

      this.activeInputs.forEach(function(input){
          self.formData[input.name] = input.value;
      });

    },

    save: function (cb) {

       var records = localStorage[this.plural] ? JSON.parse(localStorage[this.plural]) : [];
       
       records.push(this.formData);
       
       localStorage[this.plural] = JSON.stringify(records);
       
       this.$emit('save', this.plural, this.formData);
       
       cb();
    }

  },

  ready: function () {

    var that = this;
    
    setTimeout(function () {

      that.$els['form'].getElementsByTagName('input')[0].focus();
    
    }, 400);

  }

};