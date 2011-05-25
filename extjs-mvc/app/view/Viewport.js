/**
 * Border layout for application
 * `north` #menu is a application menu with toolbars
 * `west` #navifgation with treee panel and observable click ndoes
 * `center` #content panel to load content in tabs
 */
Ext.define('APP.view.Viewport', {
	extend: 'Ext.Viewport',
	//alias: 'widget.MainViewport',
	layout: 'border',
	initComponent: function() {
		var me = this;
		Ext.apply(me,{
			id: 'app-viewport',
			items: [{
				xtype: 'panel',
				id: 'menu',
				title: 'PWI 2.0 ENTERPRISE',
				region: 'north',
				border: false,
				layout: 'fit',
				margins: '0 0 5 0',
				collapsible: true,
				stateful: true,
				stateId: 'menu',
				tools:[{
					type:'refresh',
					qtip: 'Refresh form Data',
					// hidden:true,
					handler: function(event, toolEl, panel){
					// refresh logic
					}
				},{
					type:'help',
					qtip: 'Get Help',
					handler: function(event, toolEl, panel){
					// show help here
					}
				}],
				dockedItems: {
					xtype: 'toolbar',
					dock: 'top',
					items: [{
						xtype: 'buttongroup',
						title: 'Campaign',
						columns: 2,
						items: [{
							xtype: 'button',
							text: 'List',
							scale: 'large',
							rowspan: 2
						},{
							xtype: 'button',
							text: 'New'
						},{
							xtype: 'button',
							text: 'Properties'
						}]
					},{
						xtype: 'buttongroup',
						title: 'Users Managament',
						columns: 2,
						width: 108,
						items: [{
							xtype: 'button',
							text: 'List',
							scale: 'large',
							rowspan: 2,
							colspan: 1
						}, {
							xtype: 'button',
							text: 'New'
						}, {
							xtype: 'button',
							text: 'List'
						}]
					}, {
						xtype: 'buttongroup',
						title: 'Messages',
						columns: 2,
						items: [{
							xtype: 'button',
							text: 'Inbox',
							scale: 'large',
							rowspan: 2
						}, {
							xtype: 'button',
							text: 'Compose'
						}, {
							xtype: 'button',
							text: 'Sent'
						}]
					}, {
						xtype: 'buttongroup',
						title: 'Chat',
						columns: 2,
						items: [{
							xtype: 'button',
							text: 'Rooms',
							scale: 'large',
							rowspan: 2
						}, {
							xtype: 'button',
							text: 'New Room'
						}, {
							xtype: 'button',
							text: 'Archive'
						}]
					}, {
						xtype: 'buttongroup',
						title: 'View',
						columns: 3,
						items: [{
							xtype: 'cycle',
							showText: true,
							scale: 'large',
							rowspan: 2,
							minWidth: 190,
							prependText: 'Dashboard: ',
							//ref: '../../../btnDashboardsView',
							menu: {
								items: [
								{
									//xtype: 'menucheckitem',
									text: 'Default (system)',
									checked: true
								}, {
									//xtype: 'menucheckitem',
									text: 'Admin (system)'
								}, {
									//xtype: 'menucheckitem',
									text: 'Agent (system)'
								}, {
									//xtype: 'menucheckitem',
									text: 'Mojfajny dash'
								}]
							}
						}, {
							xtype: 'button',
							text: 'Fullscreen',
							scale: 'large',
							rowspan: 2,
							enableToggle: true,
							stateful: true,
							action: 'fullscreen'
						//ref: '../../../btnFullscreen'
						},{
							xtype: 'button',
							text: 'Close tabs',
							iconCls: 'ico-menu-closetab'
						//ref: '../../../btnTabsDelete'
						},{
							xtype: 'button',
							text: 'Session',
							iconCls: 'ico-menu-session',
							menu: {
								xtype: 'menu',
								items: [
								{
									//xtype: 'menuitem',
									text: 'Save as ...'
								}, {
								//xtype: 'menuseparator'
								}, {
									//xtype: 'menuitem',
									text: 'Administrator (system)'
								}, {
									//xtype: 'menuitem',
									text: 'Agent (system)'
								}, {
								//xtype: 'menuseparator'
								}, {
									//xtype: 'menuitem',
									text: 'Some of saved session (2011-03-24)'
								}]
							}
						}]
					},{
						xtype: 'buttongroup',
						title: 'Account',
						columns: 2,
						items: [{
							xtype: 'button',
							text: 'Settings',
							scale: 'large',
							rowspan: 2
						}, {
							xtype: 'button',
							text: 'Support'
						}, {
							xtype: 'button',
							text: 'Logout'
						}]
					}]
				}
			},{
				xtype: 'treepanel',
				id: 'navigation',
				title: 'Navigation',
				region: 'west',
				width: 200,
				split: true,
				closable: true,
				collapsible: true,
				useArrows: true,
				rootVisible: false,
				enableDrag: true,
				stateful: true,
				ddGroup: 'ModuleDD',
				stateId: 'navigation',
				//ref: 'mainModules',
				root: {
					expanded: true,
					text: 'Modules',
					//editable: false,
					//href: '#/',
					//allowDrop: false,
					//draggable: true,
					children: [{
						text: 'Users',
						user: "user",
						status: "status",
						//id: 'usersIndex',
						openTab: 'usersIndex',
						leaf: true
					//href: '#/users',
					//allowDrop: false,
					//editable: false,
					}, {
						text: 'Reports',
						leaf: true
					//expanded: true
					//href: '#/reports',
					//allowDrop: false,
					//editable: false
					}, {
						text: 'Campaigns',
						leaf: true
					//expanded: true
					//href: '#/campaigns',
					//allowDrop: false,
					//editable: false
					}, {
						text: 'Messages',
						openTab: 'messagesIndex',
						href: '#foo/index',
						leaf: false,
						expanded: true,
						children: [{
							text: 'inbox',
							openTab: 'messagesIndex',
							leaf: true
						},{
							text: 'outbox',
							leaf: true
						},{
							text: 'alerts',
							leaf: true
						}]
					}]
				}
			},{
				xtype: 'tabpanel',
				id:'content',
				region: 'center',
				//deferredRender: false,
				enableTabScroll: true,
				resizeTabs: true,
				tabWidth: 150,
				stateful: true,
				stateId: 'tabs',
				items: []
			},{
				xtype: 'container',
				region: 'south',
				height: 25
			}]
		});

		me.callParent();
	},

	changeView: function(view) {
		var me = this,
		container = me.down('#content');
		// @deparaced
		// container.removeAll();
		// add new tab to content
		me.addView(view);
	},

	addView: function(view) {
		var me = this,
		container = me.down('#content');

		container.add(view);
	},

	hasView: function(selector) {
		var me = this,
		container = me.down('#content');

		return (container.child(selector) != null);
	}
});