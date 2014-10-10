Crack.LoginController = Ember.Controller.extend({
  needs: ['application'],
  username: '',

  actions: {
    login: function(){
      this.set('controllers.application.currentUser', {
        username: this.get('username')
      });
      this.set('username', '');
      this.transitionToRoute('/');
    }
  }
});
