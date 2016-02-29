import Ember from 'ember';

export default Ember.Component.extend({

  headtabs: Ember.inject.service('services.headtabs'),


  /**
   * pass service tabs to component
   * @returns {*}
   */
  init: function () {
    this.openTabs = this.get('headtabs').openTabs;

    console.error(this.openTabs);
    return this._super();
  },
  actions: {
    closeTab(tab){
      this.get('headtabs').closeTab(tab);
    },
    tabClicked(tab){
      this.get('headtabs').switchToTab(tab);
    }
  }


});
