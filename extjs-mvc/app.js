Ext.Loader.setConfig({
	enabled: true
});
Ext.Ajax.defaultHeaders = {
	'Accept': 'application/json'
};
Ext.application({
	name: 'FV',
	appFolder: '/js/main/app',
	// All the paths for custom classes
	paths: {
		'Ext.ux': '/js/ext4/examples/ux'
	},
	// Define all the controllers that should initialize at boot up of your application
	controllers: [
		'Menus',
		'Articles',
		'Users'
	]
});
