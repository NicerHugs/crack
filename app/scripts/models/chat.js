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
