window.Crack = Ember.Application.create();

Crack.ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: new Firebase('https://nicerhugs.firebaseio.com')
});
