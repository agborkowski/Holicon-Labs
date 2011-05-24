Ext.define('APP.store.Messages', {
	extend: 'Ext.data.Store',
	model: 'APP.model.Message',
	//autoLoad: true,
	remoteSort: true,
	autoSync: true
});
