Ext.define('FV.view.users.Index', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.usersIndex',
	requires: [
		'FV.view.users.Grid',
		'FV.view.users.Preview'
	],
	closable: true,
	iconCls: 'users index',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function() {
		Ext.apply(this, {
			items: [{
				xtype: 'usersGrid',
				flex: 1
			},{
				xtype: 'usersPreview',
				cls: 'preview',
				height: 300
			}]
		});

		this.callParent(arguments);
	}
});
