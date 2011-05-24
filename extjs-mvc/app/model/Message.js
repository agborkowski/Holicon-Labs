Ext.define('APP.model.Message', {
	extend: 'Ext.data.Model',
	fields: ['id', 'user_id','theard_id','campaign_id','method_id','title','message','status'],
	//idProperty: 'id',
	proxy: {
		type: 'rest',
		url: '/messages',
		reader: {
			root: 'data'
		}
	}
});