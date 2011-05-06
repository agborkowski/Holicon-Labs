Ext.define('FV.controller.Users', {
	extend: 'Ext.app.Controller',
	
	stores: ['Users'],
	
	models: ['User'],
	
	views: ['users.Grid', 'users.Preview','users.Add'],
	
	refs: [{
		ref: 'content',
		selector: 'content'
	},{
		ref: 'usersPreview',
		selector: 'usersPreview'
	},{
		ref: 'usersPreview',
		xtype: 'usersPreview',
		closable: true,
		forceCreate: true,
		selector: 'users.preview'
	},{
		ref: 'usersAddFrom', 
		selector: 'usersAdd form'
	},{
		ref: 'usersAddCombobox', 
		selector: 'usersAdd combobox'
	},{
		ref: 'usersGrid', 
		selector: 'usersGrid'
	},{
		ref: 'usersAdd', 
		selector: 'usersAdd', 
		autoCreate: true,
		xtype: 'usersAdd'
	}],

	init: function() {
		this.control({
			/*
			'grid': {
				selectionchange: this.previewUser
			},
			'grid > tableview': {
				itemdblclick: this.loadUser,
				refresh: this.selectUser
			},
			'grid button[action=openall]': {
				click: this.openAllUsers
			},
			*/
			'grid button[action=add]': {
				click: this.add
			}
			/*
			'grid button[action=remove]': {
				click: this.remove
			},
			'preview button[action=viewintab]': {
				click: this.view
			},
			'preview button[action=gotouser]': {
				click: this.open
			},	
			'add button[action=submit]': {
				click: this.submit
			},
			'add button[action=reset]': {
				click: this.reset
			}
			*/
		});
	},

	selectUser: function(view) {
		var first = this.getUsersStore().getAt(0);
		if (first) {
			view.getSelectionModel().select(first);
		}
	},

	/**
     * Loads the given article into the preview panel
     * @param {FV.model.Article} article The article to load
     */
	previewUser: function(grid, users) {
		var user = users[0],
		preview = this.getUserPreview();
		if (user) {
			preview.user = user;
			preview.update(user.data);
		}
	},

	open: function(btn) {
		window.open(btn.up('preview').user.get('_id'));
	},
	
	openAllUsers: function() {
		var users = [],
		viewer = this.getViewer();
            
		this.getUsersStore().each(function(user) {
			users.push(this.loadUser(null, user, true));
		}, this);
        
		viewer.add(users);
		viewer.setActiveTab(users[users.length-1]);
	},

	view: function(btn) {
		this.loadUser(null, btn.up('preview').user);
	},

	/**
     * Loads the given article into a new tab
     * @param {FV.model.Article} article The article to load into a new tab
     */
	loadUser: function(view, user, preventAdd) {
		var viewer = this.getViewer(),
		login = user.get('login'),
		userId = user.id;
		tab = viewer.down('[userId=' + userId + ']');
		if (!tab) {
			tab = this.getUserTab();
		}
		tab.setTitle(login);
		tab.user = user;
		tab.userId = userId;
		tab.update(user.data);
		if (preventAdd !== true) {
			viewer.add(tab);
			viewer.setActiveTab(tab);            
		}
		return tab;
	},
	/*
	onLaunch: function() {
		var dataview = this.getUserData(),
		store = this.getUserStore();
            
		dataview.bindStore(store);
		dataview.getSelectionModel().select(store.getAt(0));
	},
   */
	
	/**
     * Loads the given feed into the viewer
     * @param {FV.model.feed} feed The feed to load
     
	loadFeed: function(selModel, selected) {
		var grid = this.getArticleGrid(),
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
    */
	/**
     * Shows the add feed dialog window
     */
	add: function() {
		alert('how how');
		this.getAdd().show();
	},
    
	/**
     * Removes the given feed from the Feeds store
     * @param {FV.model.Feed} feed The feed to remove
     */
	remove: function() {
		this.getUserStore().remove(this.getUserData().getSelectionModel().getSelection()[0]);
	},
    
	/**
     * @private
     * Creates a new feed in the store based on a given url. First validates that the feed is well formed
     * using FV.lib.FeedValidator.
     * @param {String} name The name of the Feed to create
     * @param {String} url The url of the Feed to create
     */
	submit: function() {
		var win   = this.getUserWindow(),
		form  = this.getUserForm(),
		combo = this.getUserCombo(),
		store = this.getUserStore(),
		user  = this.getUserModel().create({
			name: combo.getDisplayValue(),
			url: combo.getValue()
		});

		form.setLoading({
			msg: 'Validating feed...'
		});
        
		FV.lib.UserValidator.validate(user, {
			success: function() {
				store.add(user);
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
