Ext.define('FV.view.Viewport', {
	extend: 'Ext.container.Viewport',

	requires: [
	'FV.view.Content',
	'FV.view.menus.Index',
	'Ext.layout.container.Border'
	],

	layout: 'border',

	items: [{
		region: 'center',
		xtype: 'content'
	}, {
		region: 'west',
		width: 225,
		xtype: 'menusIndex'
	}]
});
