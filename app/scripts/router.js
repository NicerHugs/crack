Crack.Router.map(function() {
  this.route('login');
});

Crack.IndexRoute = Ember.Route.extend({

  beforeModel: function(){
    var user = this.controllerFor('application').get('currentUser');
    if( ! user ) {
      this.transitionTo('login');
    }
  },

  model: function(){
    return this.store.find('chat');
  }
});
