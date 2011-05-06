Ext.define('FV.view.articles.Index', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.articlesIndex',

	closable: false,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	initComponent: function() {
		Ext.apply(this, {
			items: [{
				xtype: 'articlesGrid',
				flex: 1
			},{
				xtype: 'articlesPreview',
				cls: 'articles preview',
				height: 300
			}]
		});

		this.callParent(arguments);
	}
});
