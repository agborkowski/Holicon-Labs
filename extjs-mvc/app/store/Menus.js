Ext.define('FV.store.Menus', {
    extend: 'Ext.data.Store',

    model: 'FV.model.Menu',

    data: [
        {name: 'Sencha Blog',   url: 'http://feeds.feedburner.com/extblog'},
        {name: 'Sencha Forums', url: 'http://sencha.com/forum/external.php?type=RSS2'},
        {name: 'Ajaxian',       url: 'http://feeds.feedburner.com/ajaxian'}
    ]
});
