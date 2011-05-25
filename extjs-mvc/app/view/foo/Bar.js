Ext.define('App.view.foo.Bar' ,{
    extend: 'Ext.panel.Panel',

    height: 200,
    
    initComponent: function() {
    	Ext.apply(this, {
    		title: 'Foobar',
    		height: 150,
    		html: 'foo'
    	});

        this.callParent();
    }
});