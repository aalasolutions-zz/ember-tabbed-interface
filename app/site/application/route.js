import Ember from 'ember';

export default Ember.Route.extend({
  //tabs: null,

  //tabs: Ember.inject.service('services.tabs'),
  //
  //isModuleLoaded: function (moduleName) {
  //  var tabs = this.get("tabs");
  //  if (tabs !== null) {
  //    var target = tabs.findBy("name", moduleName);
  //    return target !== undefined;
  //  }
  //
  //  return undefined;
  //},
  //action: {
    //setActiveTab: function (tabName) {
    //  if (this.tabs.get("content").length > 0) {
    //    for (var i = 0; i < this.tabs.get("content").length; i++) {
    //      var item = this.tabs.objectAt(i);
    //      item.set("isActive", false);
    //    }
    //
    //    var target = this.tabs.findBy("name", tabName);
    //    if (target !== undefined) {
    //      target.set("isActive", true);
    //
    //      //$(".tab-content div.active").removeClass("in active");
    //      //$(".tab-content div#" + tabName.decamelize()).addClass("in active");
    //    }
    //  }
    //},
    //closeTab: function (tabItem) {
    //  var self = this;
    //  var target = this.tabs.findBy("name", tabItem.name);
    //  if (target !== undefined) {
    //    this.tabs.removeObject(target);
    //    this.send("setActiveTab", "Home");
    //  } else {
    //    console.log("tab item not defined!");
    //  }
    //},
    //setActiveMenu: function (target) {
      //$(".nav.navbar-nav li").each(function () {
      //  $(this).removeClass("active");
      //});

      //var $target = $(".nav.navbar-nav li#" + target);
      //$target.addClass("active");
    //}
  //}
});
