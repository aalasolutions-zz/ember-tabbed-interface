import Ember from 'ember';

export default Ember.Service.extend({
  openTabs: Ember.A(),

  /**
   * Create a default Dashboard Tab
   */
  init() {
    this._super(...arguments);
    var tabs = this.get('openTabs');
    var newTab = {
      id: 1,
      route: 'index',
      title: 'Dashboard',
      isDirty: false,
      isActive: '',
      isRoot: true
    };

    tabs.pushObject(newTab);
  },


  /**
   * Generate an object for tab. This will be used for new tab, and also to swap current tab with new properties
   * @param url
   * @param isDirty
   * @returns {*}
   */
  makeTabProperties(url, isDirty){

    var urlParam = null;
    if(url.params[1] !== undefined){
      urlParam = url.params[1];
    }

    var tabIndex = new Date().toISOString();
    var tab = {
      id: tabIndex,
      route: url.params[0],
      title: url.title,
      params: urlParam,
      isDirty: isDirty
    };
    return tab;
  },
  /**
   * Add a Tab from Route Link, Where a link will have openTab=true, it will call this function
   * @param url Where to redirect
   * @param isDirty A dirty state check
   */
  addTabFromRoute(url, isDirty) {
    // Get all the open tabs
    var tabs = this.get('openTabs');

    /**
     * search in open tabs if tab is there or not
     * if no tab is found then create a new tab. else switch to that tab
     */
    var isTab = tabs.findBy('route', url.params[0]);
    var newTab = null;
    if (!isTab) {
      newTab = this.makeTabProperties(url, isDirty);
      tabs.pushObject(newTab);
    } else {
      newTab = {
        id: isTab.id,
        route: isTab.route,
        title: isTab.title,
        params: isTab.params,
        isDirty: isTab.isDirty
      };
    }

    this.switchToTab(newTab);
  },
  /**
   * Close a tab, and redirect to default tab
   * @param tab
   */
  closeTab(tab) {
    if (tab.isDirty) {
      alert('The tab you are closing is unsaved!');
    }
    this.get('openTabs').removeObject(tab);
    this.get('router').transitionTo('index');
    var dashboardTab = this.get('openTabs').findBy('id', 1);

    this.switchToTab(dashboardTab);
  },

  /**
   * Switch to already open tab
   * @param tab
   */
  switchToTab(tab){
    var tabs = this.get('openTabs');
    tabs.forEach(function (t) {
      Ember.set(t, 'isActive', '');
    });
    let activeTab = tabs.findBy('id', tab.id);
    Ember.set(activeTab, 'isActive', 'active');
  },

  /**
   * Swap current tab with a new route. This is called from any link, which dont have
   * any action or tab option applied. Applies to all the links
   *
   * We will check if a tab with same route is already open or not. If it is already open
   * we switch it to that tab.
   *
   * @param url
   * @param isDirty
   */
  swapTabFromRoute(url, isDirty) {

    // check if we already have any tab with same URL, then switch to that tab
    // instead of swapping the current tab. Healty activity
    var tabs = this.get('openTabs');

    if(tabs.length <= 1){
      this.addTabFromRoute(url, isDirty);
      return;
    }

    var isTabOpen = tabs.findBy('route', url.params[0]);

    if (!isTabOpen) {
      var newTab = this.makeTabProperties(url, isDirty);
      this.swapTab(newTab);
    } else {
      this.switchToTab(isTabOpen);
    }
  },

  /**
   * Swap current tab with new page, replacing all its route, title and params
   * @param tab
   */
  swapTab(tab){
    var tabs = this.get('openTabs');
    let currentTab = tabs.findBy('isActive', 'active');
    Ember.set(currentTab, 'route', tab.route);
    Ember.set(currentTab, 'title', tab.title);
    Ember.set(currentTab, 'params', tab.params);
  }
});
