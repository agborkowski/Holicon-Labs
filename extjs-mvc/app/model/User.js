Ext.define('APP.model.User', {
	extend: 'Ext.data.Model',
	fields: ['_id', 'password','login'],
	idProperty: '_id',
	proxy: {
		type: 'rest',
		url: '/users',
		reader: {
			root: 'data'
		}	
	}
});