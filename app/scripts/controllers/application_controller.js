Crack.ApplicationController = Ember.Controller.extend({
  actions: {
    search: function() {
      console.log('hi');
    },
    logout: function() {
      this.set('currentUser.username', '');
      this.transitionToRoute('login');
    }
  },
  currentUser: null,
});
