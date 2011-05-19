Ext.define('APP.store.Users', {
	extend: 'Ext.data.Store',
	model: 'APP.model.User',
	//autoLoad: true,
	remoteSort: true,
	autoSync: true
});
