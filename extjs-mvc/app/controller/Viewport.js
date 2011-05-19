Ext.define('APP.controller.Viewport', {
	extend: 'Ext.app.Controller',
	//stores: ['Menus', 'Articles'],
	//models: ['Menu'],
	views: ['Viewport'],

	refs: [{
			ref: 'MainViewport',
			selector: 'MainViewport'
		},{
			ref: 'menu',
			selector: '#menu'
		},{
			ref: 'navigation',
			selector: '#navigation'
		},{
			ref: 'content',
			selector: '#content'
		}
	],

	// At this point things haven't rendered yet since init gets called on controllers before the launch function
	// is executed on the Application
	init: function() {
		this.control({
			'MainViewport button[action=fullscreen]': {
				click: this.onFullscreenClick
			},
			'#navigation': {
				itemclick: this.onNavigationClick
			}
		});
	},
	/**
	 * Main Menu buttons function
	 **/
	onBtnTabsDeleteClick: function (){
		var mainTab = this.MainTab;
		mainTab.items.each(function(tab){
			if(tab && tab.xtype && tab.xtype !== '/dashboards/view'){
				mainTab.remove(tab,true);
			}
		});
	},
	onBtnDashboardsViewClick: function (){

	},
	onBtnAddUserClick: function (){
		alert('test');
	},
	/**
	 * Fullscreen support
	 **/
	onFullscreenClick: function (btn){
		Ext.each([this.getMenu(), this.getNavigation()], function(panel){
			if(btn.pressed){
				panel.collapse(0,true);
			}else{
				panel.expand(true);
				console.log(panel);
			}
		});
		if(btn.pressed){
			Ext.Msg.show({
				title: 'Full screen mode',
				msg: 'You are enter to full screen mode.',
				modal:true,
				icon:Ext.Msg.INFO,
				buttons:Ext.Msg.OK
			});
		}
	},
	/**
	 * Observer at left modules menu
	 **/
	onNavigationClick: function (view,record){
		var xtype = record.raw.openTab;
		//if(Ext.ComponentMgr.isRegistered(xtype)){
			var newTab = this.getContent().add({
				xtype: xtype
			});
			this.getContent().setActiveTab(newTab);
		//}else{
			//console.log("[warn] create view: '" + xtype +"' for this route.");
		//}
	},
	/**
	 * Events
	 * */
	_fireFullscreeen : function(){

	},
	/* parse Route Params
   * @author ab2
   * @acces private
   * */
	_params: function(url){
		var uriPartNames = [null,"controller","action"], p = 0, path = {};
		uriParts = url.split('/');
		// @todo make count or foreach
		for(var i = 1; i < 10; i++){
			if(uriParts[i]){
				path[ (uriPartNames[i] ? uriPartNames[i] : p++)] = uriParts[i];
			}else{
				return path;
			}
		}
	}
});