Ext.define('APP.controller.Users', {
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
			 * , 'grid button[action=openall]': { click: this.openAllUsers },
			 */
			'usersGrid button[action=remove]' : {
				click : this.remove
			},
			/*
			 * 'preview button[action=viewintab]': { click: this.view }, 'preview
			 * button[action=gotouser]': { click: this.open },
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
				selectionchange : this.previewUser,
				render: this.onUsersRender
			},
			'usersGrid > tableview' : {
				itemdblclick : this.edit,
				refresh : this.onUsersSelect
			},
			'usersGrid button[action=add]' : {
				click : this.edit
			}
		});
	},
	onViewClick : function(btn) {
		this.view(null, btn.up('preview').user);
	},
	onLaunch: function() {
		var grid = this.getUsersGrid(), store = this.getUsersStore();
		grid.getSelectionModel().select(store.getAt(0));
	},
	onUsersSelect : function(view) {
		var first = this.getUsersStore().getAt(0);
		if (first) {
			view.getSelectionModel().select(first);
		}
	},
	/**
     * Loads data to store (latly binding)
     */
	onUsersRender: function() {
		var grid = this.getUsersGrid(),
		store = this.getUsersStore();
		store.load();
	},
	/**
	 * Loads the given user into the preview panel
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

	/**
	 * Loads the given user into a new tab
	 */
	view : function(view, user, preventAdd) {
		var viewer = this.getContent(), login = user.get('login'), userId = user.id;
		tab = viewer.down('[userId=' + userId + ']');
		if (!tab) {
			tab = this.getContent();
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
	/**
	 * Shows edit dialog window
	 */
	edit : function(grid, record) {
		// var form = this.getUsersEditForm();
		var view = Ext.widget('usersEdit').show();
		console.log(record);
		if (record && record.data) {
			view.down('form').loadRecord(record);
		}
	},

	/**
	 * Removes the selected record
	 */
	remove : function() {
		var sm = this.getUsersGrid().getSelectionModel(), records = sm.getSelection();
		sm.deselectAll();
		this.getUsersStore().remove(records);
	},

	submit : function(button) {
		var win = button.up('window'), form = win.down('form'),
		record = form.getRecord(), values = form.getValues(), usersStore = this.getUsersStore();
		if (record && record.data) {
			form.getForm().updateRecord(record);
		} else {
			usersStore.insert(0,values);
		}
		win.close();
	}
});
