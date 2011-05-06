Ext.define('FV.view.Content', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.content',
	
	requires: ['FV.view.articles.Index','FV.view.users.Index'],  
	
	activeItem: 0,
	margins: '5 5 5 5',
	cls: 'tabs',
	
	initComponent: function() {
		this.items = [{
			xtype: 'articlesIndex',
			title: 'Sencha Blog'
		},{
			xtype: 'usersIndex',
			title: 'Users'
		}];
		this.callParent(arguments);
	}
});