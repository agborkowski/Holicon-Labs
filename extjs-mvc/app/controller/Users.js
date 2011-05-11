Ext.define('FV.controller.Users', {
	extend : 'Ext.app.Controller',

	stores : [ 'Users' ],

	models : [ 'User' ],

	views : [ 'users.Grid', 'users.Preview', 'users.Edit' ],

	refs : [ {
		ref : 'content',
		selector : 'content'
	}, {
		ref : 'usersPreview',
		selector : 'usersPreview'
	}, {
		ref : 'usersPreview',
		xtype : 'usersPreview',
		closable : true,
		forceCreate : true,
		selector : 'usersPreview'
	}, {
		ref : 'usersEditForm',
		selector : 'usersEdit form'
	}, {
		ref : 'usersEditCombobox',
		selector : 'usersEdit combobox'
	}, {
		ref : 'usersGrid',
		selector : 'usersGrid'
	}, {
		ref : 'usersEdit',
		selector : 'usersEdit',
		autoCreate : true,
		xtype : 'usersEdit'
	} ],

	init : function() {
		this.control({
			/*
			,
			'grid button[action=openall]': {
				click: this.openAllUsers
			},
			 */

			'usersGrid button[action=remove]' : {
				click : this.remove
			},
			/*
			'preview button[action=viewintab]': {
				click: this.view
			},
			'preview button[action=gotouser]': {
				click: this.open
			},
			 */
			'usersEdit button[action=submit]' : {
				click : this.submit
			},
			'usersEdit button[action=reset]' : {
				click : function() {
					this.getUsersEditForm().getForm().reset();
				}
			},
			'usersGrid' : {
				selectionchange : this.previewUser
			},
			'usersGrid > tableview' : {
				itemdblclick : this.edit,
				refresh : this.selectUser
			},
			'usersGrid button[action=add]' : {
				click : this.edit
			}
		});
	},

	selectUser : function(view) {
		var first = this.getUsersStore().getAt(0);
		if (first) {
			view.getSelectionModel().select(first);
		}
	},

	/**
	 * Loads the given article into the preview panel
	 * @param {FV.model.Article} article The article to load
	 */
	previewUser : function(grid, users) {
		var user = users[0], preview = this.getUsersPreview();
		if (user) {
			preview.user = user;
			preview.update(user.data);
		}
	},

	open : function(btn) {
		window.open(btn.up('preview').user.get('_id'));
	},

	openAllUsers : function() {
		var users = [], viewer = this.getViewer();

		this.getUsersStore().each(function(user) {
			users.push(this.loadUser(null, user, true));
		}, this);

		viewer.add(users);
		viewer.setActiveTab(users[users.length - 1]);
	},
	view : function(btn) {
		this.loadUser(null, btn.up('preview').user);
	},
	/**
	 * Loads the given article into a new tab
	 * @param {FV.model.Article} article The article to load into a new tab
	 */
	loadUser : function(view, user, preventAdd) {
		var viewer = this.getViewer(), login = user.get('login'), userId = user.id;
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
		var dataview = this.getUsersGrid(),
		store = this.getUsersStore();
	   console.log(dataview);
		 console.log(store);
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
	edit : function(grid, record) {
		//var form = this.getUsersEditForm();
		var view = Ext.widget('usersEdit').show();
		console.log(record);
		if (record && record.data) {
			view.down('form').loadRecord(record);
		}
	},

	/**
	 * Removes the given feed from the Feeds store
	 * @param {FV.model.Feed} feed The feed to remove
	 */
	remove : function() {
		this.getUsersStore().destroy(
				this.getUsersGrid().getSelectionModel().getSelection()[0]);
		this.getUsersStore().save();
	},

	submit : function(button) {
		var win = button.up('window'), form = win.down('form'), record = form
				.getRecord(), values = form.getValues();
		if (record && record.data) {
			console.log('update');
			console.log('values');
			record.set(values);
			record.save();
			record.sync();
			//Object { _id="4db5a90748177e5d05000008", login="update", more...}
		} else {
			console.log('new');
			console.log(values);
			//Object { _id="", login="new", more...}
			this.getUsersStore().add(values);
			this.getUsersStore().save();
		}
		win.close();
		//Object { _id="4db5a87c48177e2507000006", login="ab2", more...}
	}
});
