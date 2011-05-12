/**
 * Application class
 * @author AgBorkowski
 * @class app
 */
Ext.Loader.setConfig({
	enabled: true
});
Ext.Ajax.defaultHeaders = {
	'Accept' : 'application/json,application/xml',
	'Content-Type' : 'application/json'
};
Ext.application({
	name: 'APP',
	appFolder: '/js/main/app',
	paths: {
		'Ext.ux': '/js/ext4/examples/ux'
	},
	controllers: [
		'Menus', // @todo move to viewport @todo delete
		'Articles',
		'Users'
	]
});