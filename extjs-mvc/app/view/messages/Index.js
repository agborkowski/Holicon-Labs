Ext.define('APP.view.messages.Index', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.messagesIndex',
	title: 'Messages',
	requires: [
		'APP.view.messages.Grid',
		'APP.view.messages.Preview'
	],
	closable: true,
	iconCls: 'messages index',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function() {
		Ext.apply(this, {
			items: [{
				xtype: 'messagesGrid',
				flex: 1
			},{
				xtype: 'messagesPreview',
				cls: 'preview',
				height: 300
			}]
		});

		this.callParent(arguments);
	}
});
