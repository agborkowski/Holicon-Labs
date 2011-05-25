Ext.define('APP.model.Message', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'user_id',
		'theard_id',
		'campaign_id',
		'type',
		'box',
		'status',
		'reciver',
		'title',
		'message'
	],
	proxy: {
		type: 'rest',
		url: '/messages',
		reader: {
			root: 'data'
		}
	}
});