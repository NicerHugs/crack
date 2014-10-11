window.Crack = Ember.Application.create();

Crack.ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: new Firebase('https://nicerhugs.firebaseio.com')
});

//Chat adapter changes where ember looks for/saves data on firebase
Crack.ChatAdapter = Crack.ApplicationAdapter.extend({
  pathForType: function(type) {
    return "rooms/general";
  }
});

Crack.Chat = DS.Model.extend({
  username: DS.attr('string'),
  message: DS.attr('string'),
  timestamp: DS.attr('date')
});

Crack.Router.map(function() {
  this.route('login');
});

Crack.IndexRoute = Ember.Route.extend({

  beforeModel: function() {
    var user = this.controllerFor('application').get('currentUser');
    if( ! user ) {
      this.transitionTo('login');
    }
  },

  model: function() {
    return this.store.find('chat');
  },
});

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
