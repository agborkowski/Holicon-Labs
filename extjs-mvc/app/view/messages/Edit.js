Ext.define('APP.view.messages.Edit', {
	extend: 'Ext.window.Window',

	alias: 'widget.messagesEdit',

	requires: ['Ext.form.Panel', 'Ext.form.field.ComboBox'],

	type: [
		['sms', 'sms'],
		['email', 'e-mail'],
		['alert', 'alert']
	],
	title: 'Message',
	closeAction: 'hide',
	iconCls: 'messages add',
	layout: 'fit',
	width: 500,
	heigth: 400,
	initComponent: function() {
		Ext.apply(this, {
			border: false,
			buttons: [{
				text: 'Reset',
				action: 'reset'
			},{
				text: 'Cancel',
				scope: this,
				handler: this.close
			},{
				text: 'Submit',
				action: 'submit'
			}],

			items: [{
				xtype: 'form',
				monitorValid: true,
				autoScroll: true,
				url: '/messages',
				trackResetOnLoad: true,
				defaults: {
					'allowBlank': false
				},
				bodyStyle: 'padding: 10px;',
				items: [
				{
					xtype: 'fieldset',
					title: 'Message',
					defaults: {
						'allowBlank': false
					},
					items: [
						{
							xtype: 'combo',
							fieldLabel: 'Type',
							store: this.type,
							getInnerTpl: function() {
								return '<div class="message-key">{field1}</div><div class="message-val">{field2}</div>';
							},
							name: 'type'
						},{
							xtype: 'textfield',
							fieldLabel: 'To',
							anchor: '100%',
							name: 'reciver'
						},{
							xtype: 'textfield',
							fieldLabel: 'Title',
							anchor: '100%',
							name: 'title'
							//inputType: 'password'
						},{
							xtype: 'textarea',
							fieldLabel: 'Message',
							anchor: '100%',
							name: 'message'
							//inputType: 'password'
						}
					]
				}]
			}]
		});

		this.callParent(arguments);
	}
});
