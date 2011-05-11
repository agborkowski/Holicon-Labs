Ext.define('FV.view.users.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.usersGrid',
	cls: 'users grid',
	disabled: false,
	requires: ['Ext.ux.PreviewPlugin', 'Ext.toolbar.Toolbar'],
	border: false,
	initComponent: function() {
		Ext.apply(this, {
			store: 'Users',
			viewConfig: {
				plugins: [{
					pluginId: 'preview',
					ptype: 'preview',
					bodyField: 'description',
					previewExpanded: true
				}]
			},

			columns: [{
				text: 'Login',
				dataIndex: 'login',
				flex: 1,
				renderer: this.formatTitle
			}, {
				text: 'Password',
				dataIndex: 'password',
				//hidden: true,
				width: 200
			}],
		
			dockedItems:[{
				xtype: 'toolbar',
				dock: 'top',
				items: [{
					xtype: 'button',
					text: 'Add',
					iconCls: 'ico menu add',
					action: 'add'
				},{
					xtype: 'button',
					text: 'Edit',
					iconCls: 'ico menu edit',
					disabled: true,
					action: 'edit'
				},{
					xtype: 'button',
					text: 'Delete',
					iconCls: 'ico menu delete',
					//disabled: true,
					action: 'remove'
				},{
					text: 'Open All',
					action: 'openall'
				}]
			},{
          xtype: 'pagingtoolbar',
          store: 'Users',
					dock: 'bottom'
          //,displayInfo: true
			}]
		});

		this.callParent(arguments);
	},

	/**
	 * Title renderer
	 * @private
	 */
	formatTitle: function(value, p, record) {
		return Ext.String.format('<div class="topic"><b>{0}</b><span class="author">{1}</span></div>', value, record.get('author') || "Unknown");
	},

	/**
	 * Date renderer
	 * @private
	 */
	formatDate: function(date) {
		if (!date) {
			return '';
		}

		var now = new Date(),
		d = Ext.Date.clearTime(now, true),
		notime = Ext.Date.clearTime(date, true).getTime();

		if (notime === d.getTime()) {
			return 'Today ' + Ext.Date.format(date, 'g:i a');
		}

		d = Ext.Date.add(d, 'd', -6);
		if (d.getTime() <= notime) {
			return Ext.Date.format(date, 'D g:i a');
		}
		return Ext.Date.format(date, 'Y/m/d g:i a');
	}
});
