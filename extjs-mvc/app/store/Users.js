Ext.define('FV.store.Users', {
	extend: 'Ext.data.Store',
	requires: ['Ext.data.reader.Json'],
	model: 'FV.model.User',
	//autoSync: true,
	remoteSort: true,
	proxy: {
		type: 'rest',
		url: '/users',
		idProperty: '_id',
		reader: {
			type: 'json',
			idProperty: '_id',
			root: 'data'
		}
	},
	autoLoad: true,
	sortInfo: {
		property: '_id',
		direction: 'DESC'
	}
});
