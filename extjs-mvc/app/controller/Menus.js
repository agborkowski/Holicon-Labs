Ext.define('FV.controller.Menus', {
	extend: 'Ext.app.Controller',
	stores: ['Menus', 'Articles'],
	models: ['Menu'],
	views: ['menus.Add','menus.Index'],

	refs: [{
		ref: 'menusIndex', 
		selector: 'menusIndex'
	},{
		ref: 'menusIndexDataview', 
		selector: 'menusIndex dataview'
	},{
		ref: 'menusAddForm', 
		selector: 'menusAdd form'
	},{
		ref: 'menusAddCombobox', 
		selector: 'menusAdd combobox'
	},{
		ref: 'articlesGrid', 
		selector: 'articlesGrid'
	},{
		ref: 'menusAdd', 
		selector: 'menusAdd', 
		autoCreate: true,
		xtype: 'menusAdd'
	}], 
	
	requires: ['FV.lib.FeedValidator'],

	// At this point things haven't rendered yet since init gets called on controllers before the launch function
	// is executed on the Application
	init: function() {
		this.control({
			'menusIndex dataview': {
				selectionchange: this.load
			},
			'menusIndex button[action=add]': {
				click: this.add
			},
			'menusIndex button[action=remove]': {
				click: this.remove
			},
			'menusAdd button[action=create]': {
				click: this.create
			}
		});
	},
    
	onLaunch: function() {
		var dataview = this.getMenusIndexDataview(),
		store = this.getMenusStore();
		dataview.bindStore(store);
		dataview.getSelectionModel().select(store.getAt(0));
	},
    
	/**
	 * Loads the given feed into the viewer
	 * @param {FV.model.feed} feed The feed to load
	 */
	load: function(selModel, selected) {
		var grid = this.getArticlesGrid(),
		store = this.getArticlesStore(),
		feed = selected[0];
		if (feed) {
			grid.enable();
			store.load({
				params: {
					feed: feed.get('url')
				}
			});            
		}
	},
    
	/**
     * Shows the add feed dialog window
     */
	add: function() {
		this.getMenuAdd().show();
	},
    
	/**
     * Removes the given feed from the Feeds store
     * @param {FV.model.Feed} feed The feed to remove
     */
	remove: function() {
		this.getMenusStore().remove(this.getMenusPanelDataview().getSelectionModel().getSelection()[0]);
	},
    
	/**
     * @private
     * Creates a new feed in the store based on a given url. First validates that the feed is well formed
     * using FV.lib.FeedValidator.
     * @param {String} name The name of the Feed to create
     * @param {String} url The url of the Feed to create
     */
	create: function() {
		var win   = this.getFeedWindow(),
		form  = this.getFeedForm(),
		combo = this.getFeedCombo(),
		store = this.getFeedsStore(),
		feed  = this.getFeedModel().create({
			name: combo.getDisplayValue(),
			url: combo.getValue()
		});

		form.setLoading({
			msg: 'Validating feed...'
		});
        
		FV.lib.FeedValidator.validate(feed, {
			success: function() {
				store.add(feed);
				form.setLoading(false);
				win.hide();
			},
			failure: function() {
				form.setLoading(false);
				form.down('[name=feed]').markInvalid('The URL specified is not a valid RSS2 feed.');
			}
		});
	}
});