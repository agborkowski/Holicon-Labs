Ext.define('APP.view.Viewport', {
	extend: 'Ext.container.Viewport',

	requires: [
		'APP.view.Content',
		'APP.view.menus.Index',
		'Ext.layout.container.Border'
	],

	layout: 'border',

	items: [{
		region: 'center',
		xtype: 'content'
	},{
		region: 'west',
		width: 225,
		xtype: 'menusIndex'
	}]
});