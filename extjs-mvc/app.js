/**
 * Application class
 * @author AgBorkowski
 * @class app
 */
// enable loader
Ext.Loader.setConfig({
	enabled:true,
	paths: {
		'App': '/js/main/app',
		'Util': '/js/main/app/util'
	}
});
// This is a simple somment added by me.
// comment form task 2
// initialize utils
Util = {};

// enable state
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

Ext.Ajax.defaultHeaders = {
	'Accept' : 'application/json',
	'Content-Type' : 'application/json'
//,'Accept-Charset' : 'utf-8'
};
// comment for task-3
// kaktus// kaktus// kaktus
// comment for task-4-ab
// comment for task-5-ab
Ext.application({
	name: 'APP',
	appFolder: '/js/main/app',
	paths: {
		'Ext.ux': '/js/ext4/examples/ux'
	},
	//edit 3 kaktus
	//autoCreateViewport: true, @deleted
	controllers: [
	//'Menus', // @todo move to viewport @todo delete
	//'Articles',
	'Users',
	'Messages',
	'Viewport',
	'Page'
	],
	requires: ['Util.Router'],
	launch: function() {
		var me = this;
		// initialize utils
		me.initializeUtils();
		// set routes
		Util.Router.draw(function(map) {
			map.connect(':controller/:action');
		});

		// init history
		Ext.History.init(me.initDispatch, me);
		// set listener to change event of history token
		Ext.History.on('change', me.historyChange, me);
	},
	//edit 2 kaktus
	initDispatch: function() {
		var me = this,
		token = Ext.History.getToken();
		me.historyChange(token);
	},
	historyChange: function(token) {
		var me = this;
		// and check if token is set
		if(token) {
			Ext.History.add(token, true);
			var route = Util.Router.recognize(token);
			me.dispatch(route);
		}
	},
	// edit 1 kaktus
	dispatch: function(config) {
		var me = this;
		// get the specific controller
		var controller = me.getController(Ext.String.capitalize(config.controller));
		// !IMPORTANT call init method of controller
		controller.init();
		// save controllers onLaunch function if defined
		var baseOnLaunch = controller.onLaunch;
		// prototype new onLaunch, where we dispatch the action which was called
		controller.onLaunch = function(app) {
			// also call the base functionality of onlaunch
			baseOnLaunch();
			// call function
			controller[config.action]();
		};
		// check if application was launched before
		// edit 4 kaktus
		// edit 4 kaktus
		// edit 4 kaktus
		// edit 4 kaktus
		// edit 4 kaktus
		// edit 4 kaktus
		// this determines if the controller was loaded while running the app
		//  kaktus
		// kaktus
		if(me.launched) {
			// if the application was launched, call the onLaunch manually
			controller.onLaunch();
		}
	},
	getViewport: function() {
		return Ext.getCmp('app-viewport');
		// kaktus
		// kaktus// kaktus
		// kaktus// kaktus// kaktus// kaktus// kaktus
	},
	initializeUtils: function() {
		Ext.apply(Util, {
			Router: Ext.create('Util.Router')
		});
	}
});
