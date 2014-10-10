Crack.IndexController = Ember.ArrayController.extend({
  itemController: 'chat',
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
      chat.save().then(this.adjustScroll);
      this.set('newChat', '');
    }
  },
  adjustScroll: function() {
    var chatListHeight = $('.chat-list').prop('scrollHeight');
    $('.chat-list').scrollTop(chatListHeight);
  }
});

Crack.ChatController = Ember.ObjectController.extend({

  displayTime: function() {
    var fullDate = new Date(this.get('timestamp'));
    var today = new Date();
    if (isNaN(fullDate)) {
      return '';
    }
    else if (fullDate.getDate() < today.getDate() &&
      fullDate.getMonth() <= today.getMonth() &&
      fullDate.getFullYear() <= today.getFullYear()) {
        fullDate = moment(fullDate).format('MMM D h:mma');
    }
    else {
      fullDate = moment(fullDate).format('h:mma');
    }
    return fullDate;
  }.property('timestamp')
});
