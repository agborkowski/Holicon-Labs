Ext.define('APP.store.Articles', {
	extend: 'Ext.data.Store',

	requires: ['Ext.data.reader.Xml'],

	model: 'APP.model.Article',

	proxy: {
		type: 'ajax',
		url: 'feed-proxy.php',
		reader: {
			type: 'xml',
			record: 'item'
		}
	},

	sortInfo: {
		property: 'pubDate',
		direction: 'DESC'
	}
});
