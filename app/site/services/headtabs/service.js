import Ember from 'ember';

export default Ember.Service.extend({
  openTabs: Ember.A(),

  /**
   * if service is used many times it will call it once on a single route
   */
  init() {
    this._super(...arguments);

    var tabs = this.get('openTabs');

    var newTab = {
      id: 1,
      route: 'index',
      title: 'Dashboard',
      isDirty: false,
      isActive: 'active',
      isRoot: true
    };

    tabs.pushObject(newTab);
  },

  addTabFromRoute(url, isDirty) {

    var tabs = this.get('openTabs');

    var isTab = tabs.findBy('route', url.targetRouteName);

    if (!isTab) {

      var tabIndex = new Date().toISOString();
      var newTab = {
        id: tabIndex,
        route: url.targetRouteName,
        title: url.title,
        isDirty: isDirty
      };

      tabs.pushObject(newTab);
    } else {

      var newTab = {
        id: isTab.id,
        route: isTab.route,
        title: isTab.title,
        isDirty: isTab.isDirty
      };

    }
    this.switchToTab(newTab);
  },
  closeTab(tab) {
    //let tab = this.get('openTabs').findBy('route', route.targetRouteName);
    if (tab.isDirty) {
      alert('The tab you are closing is unsaved!');
    }
    this.get('openTabs').removeObject(tab);
    this.get('router').transitionTo('index');
    var dashboardTab = this.get('openTabs').findBy('id', 1);

    this.switchToTab(dashboardTab);
  },
  switchToTab(tab){
    var tabs = this.get('openTabs');
    tabs.forEach(function (t) {
      Ember.set(t, 'isActive', '');
    });
    let activeTab = tabs.findBy('id', tab.id);
    Ember.set(activeTab, 'isActive', 'active');
  },

  swapTabFromRoute(url, isDirty) {

    // check if we already have any tab with same URL, then switch to that tab
    // instead of swapping the current tab. Healty activity
    var tabs = this.get('openTabs');

    if(tabs.length <= 1){
      this.addTabFromRoute(url, isDirty);
      return;
    }
    var isTabOpen = tabs.findBy('route', url.targetRouteName);
    if (!isTabOpen) {
      var newTab = {
        route: url.targetRouteName,
        title: url.title,
        isDirty: isDirty
      };
      this.swapTab(newTab);
    } else {
      this.switchToTab(isTabOpen);
    }
  },
  swapTab(tab){
    var tabs = this.get('openTabs');
    let currentTab = tabs.findBy('isActive', 'active');
    Ember.set(currentTab, 'route', tab.route);
    Ember.set(currentTab, 'title', tab.title);
  }
});
