Ext.define('FV.view.users.Preview', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.usersPreview',

	requires: ['Ext.toolbar.Toolbar'],

	cls: 'preview',
	autoScroll: true,
	border: false,
	
	initComponent: function() {
		Ext.apply(this, {
			tpl: new Ext.XTemplate(
				'<div class="user-data">',
				'<span class="user-id">{_id}</span>',
				'<h3 class="user-login">{login}</h3>',
				'<h4 class="user-password">{password}</h4>',
				'</div>',
				'<div class="user-comment">costam costam</div>', {
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
					text: 'Go to user',
					action: 'gotouser'
				}]
			}]
		});

		this.callParent(arguments);
	}
});
