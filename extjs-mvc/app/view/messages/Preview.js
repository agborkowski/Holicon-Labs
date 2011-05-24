Ext.define('APP.view.messages.Preview', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.messagesPreview',

	requires: ['Ext.toolbar.Toolbar'],

	cls: 'preview',
	autoScroll: true,
	border: false,

	initComponent: function() {
		Ext.apply(this, {
			tpl: new Ext.XTemplate(
				'<div class="message-data">',
				'<span class="message-id">{id}</span>',
				'<h3 class="message-title">{title}</h3>',
				'<h4 class="message-message">{message}</h4>',
				'</div>',
				'<div class="message-comment">costam costam</div>', {
					getBody: function(value, all) {
						return Ext.util.Format.stripScripts(value);
					},
					/**
				 * Uses by syntax {author:this.defaultValue}
				 */
					defaultValue: function(v) {
						return v ? v : 'Unknown';
					},
					formatDate: function(value) {
						if (!value) {
							return '';
						}
						return Ext.Date.format(value, 'M j, Y, g:i a');
					}
				}),

			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				border: false,
				items: [{
					text: 'View in new tab',
					action: 'viewintab'
				}, {
					text: 'Go to message',
					action: 'gotomessage'
				}]
			}]
		});

		this.callParent(arguments);
	}
});
