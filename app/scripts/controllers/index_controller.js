Crack.IndexController = Ember.ArrayController.extend({
  needs: ['application'],
  newChat: '',
  actions: {
    createChat: function() {
      var username = this.get('controllers.application.currentUser.username');
      var chat = this.store.createRecord('chat', {
        username: username,
        timestamp: new Date(),
        message: this.get('newChat')
      });
      chat.save();
      this.set('newChat', '');  
    }
  }
});
