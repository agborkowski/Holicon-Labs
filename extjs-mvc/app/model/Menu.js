Ext.define('FV.model.Menu', {
    extend: 'Ext.data.Model',
    
    proxy: {
        type: 'memory'
    },
    
    fields: [
        {name: 'url',  type: 'string'},
        {name: 'name', type: 'string'}
    ]
});