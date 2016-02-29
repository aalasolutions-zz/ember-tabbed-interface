import Ember from 'ember';
Ember.LinkComponent.reopen({

  headtabs: Ember.inject.service('services.headtabs'),

  openTab: false,

  _sendTabAction() {

    this.sendAction('actioned');
  },

  attachAddEvent(){

    console.error(this);
      this.get('headtabs').addTabFromRoute(this, false);
  },
  /**
   * if it is not a tab opening link, it should swap the current tab
   */
  attachSwapEvent(){
    this.get('headtabs').swapTabFromRoute(this, false);
  },
  //willRender() {
  //  console.info('init will render');
  //  this._super(...arguments);
  //},

  /**
   * Assign click events
   */
  didInitAttrs() {
    this._super(...arguments);

    // Map desired event name to invoke function
    const eventName = this.get('eventName');

    if (this.get('actioned')) {
      this.on(eventName, this, this._sendTabAction);
    }else{

      if (this.get('openTab')) {
        this.on(eventName, this, this.attachAddEvent);
      } else {
        this.on(eventName, this, this.attachSwapEvent);
      }

    }

  },

  /**
   * remove any binding with events. To keep browser happy
   */
  willDestroy() {

    if (this.get('actioned')) {
      this.off(this.get('eventName'), this, this._sendTabAction);
    } else {
      if (this.get('openTab')) {
        this.off(this.get('eventName'), this, this.attachAddEvent);
      } else {
        this.off(this.get('eventName'), this, this.attachSwapEvent);
      }

    }
  }
});
