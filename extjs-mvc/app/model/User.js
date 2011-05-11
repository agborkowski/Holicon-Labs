Ext.define('FV.model.User', {
	extend: 'Ext.data.Model',
	fields: ['_id', 'password','login'],
	idProperty: '_id'
});