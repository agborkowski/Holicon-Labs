Ext.define('APP.controller.Messages', {
	extend : 'Ext.app.Controller',

	stores : [ 'Messages' ],

	models : [ 'Message' ],

	views : [ 'messages.Grid', 'messages.Preview', 'messages.Edit' ],

	refs : [ {
		ref : 'content',
		selector : 'content'
	}, {
		ref : 'messagesPreview',
		selector : 'messagesPreview'
	}, {
		ref : 'messagesPreview',
		xtype : 'messagesPreview',
		closable : true,
		forceCreate : true,
		selector : 'messagesPreview'
	}, {
		ref : 'messagesEditForm',
		selector : 'messagesEdit form'
	}, {
		ref : 'messagesEditCombobox',
		selector : 'messagesEdit combobox'
	}, {
		ref : 'messagesGrid',
		selector : 'messagesGrid'
	}, {
		ref : 'messagesEdit',
		selector : 'messagesEdit',
		autoCreate : true,
		xtype : 'messagesEdit'
	} ],

	init : function() {
		this.control({
			/*
			 * , 'grid button[action=openall]': { click: this.openAllMessages },
			 */
			'messagesGrid button[action=remove]' : {
				click : this.remove
			},
			/*
			 * 'preview button[action=viewintab]': { click: this.view }, 'preview
			 * button[action=gotomessage]': { click: this.open },
			 */
			'messagesEdit button[action=submit]' : {
				click : this.submit
			},
			'messagesEdit button[action=reset]' : {
				click : function() {
					this.getMessagesEditForm().getForm().reset();
				}
			},
			'messagesGrid' : {
				selectionchange : this.previewMessage,
				render: this.onMessagesRender
			},
			'messagesGrid > tableview' : {
				itemdblclick : this.edit,
				refresh : this.onMessagesSelect
			},
			'messagesGrid button[action=add]' : {
				click : this.edit
			}
		});
	},
	onViewClick : function(btn) {
		this.view(null, btn.up('preview').message);
	},
	/*
	onLaunch: function() {
		var grid = this.getMessagesGrid(), store = this.getMessagesStore();
		grid.getSelectionModel().select(store.getAt(0));
	},
	*/
	onMessagesSelect : function(view) {
		var first = this.getMessagesStore().getAt(0);
		if (first) {
			view.getSelectionModel().select(first);
		}
	},
	/**
     * Loads data to store (latly binding)
     */
	onMessagesRender: function() {
		var grid = this.getMessagesGrid(),
		store = this.getMessagesStore();
		store.load();
	},
	/**
	 * Loads the given message into the preview panel
	 */
	previewMessage : function(grid, messages) {
		var message = messages[0], preview = this.getMessagesPreview();
		if (message) {
			preview.message = message;
			preview.update(message.data);
		}
	},

	open : function(btn) {
		window.open(btn.up('preview').message.get('_id'));
	},

	openAllMessages : function() {
		var messages = [], viewer = this.getViewer();

		this.getMessagesStore().each(function(message) {
			messages.push(this.loadMessage(null, message, true));
		}, this);

		viewer.add(messages);
		viewer.setActiveTab(messages[messages.length - 1]);
	},

	/**
	 * Loads the given message into a new tab
	 */
	view : function(view, message, preventAdd) {
		var viewer = this.getContent(), login = message.get('login'), messageId = message.id;
		tab = viewer.down('[messageId=' + messageId + ']');
		if (!tab) {
			tab = this.getContent();
		}
		tab.setTitle(login);
		tab.message = message;
		tab.messageId = messageId;
		tab.update(message.data);
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
		// var form = this.getMessagesEditForm();
		var view = Ext.widget('messagesEdit').show();
		console.log(record);
		if (record && record.data) {
			view.down('form').loadRecord(record);
		}
	},

	/**
	 * Removes the selected record
	 */
	remove : function() {
		var sm = this.getMessagesGrid().getSelectionModel(), records = sm.getSelection();
		sm.deselectAll();
		this.getMessagesStore().remove(records);
	},

	submit : function(button) {
		var win = button.up('window'), form = win.down('form'),
		record = form.getRecord(), values = form.getValues(), messagesStore = this.getMessagesStore();
		if (record && record.data) {
			form.getForm().updateRecord(record);
		} else {
			messagesStore.insert(0,values);
		}
		win.close();
	}
});
