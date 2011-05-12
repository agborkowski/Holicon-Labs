Ext.define('APP.view.Content', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.content',
	
	requires: ['APP.view.articles.Index','APP.view.users.Index'],  
	
	activeItem: 0,
	margins: '5 5 5 5',
	cls: 'tabs',
	
	initComponent: function() {
		this.items = [
//		{
//			xtype: 'articlesIndex',
//			title: 'Sencha Blog'
//		}
		{
			xtype: 'usersIndex',
			title: 'Users'
		}];
		this.callParent(arguments);
	}
});