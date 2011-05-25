Ext.define('APP.controller.Foo', {
	extend: 'Ext.app.Controller',
	// Right now thats the only thing i dont know
	// if cant use the default 'views' because their height is not recalculated when adding the to viewport panel
	// so i have to require the correct view and create them on the fly
	//    views: ['foo.Bar'],
	requires: ['APP.view.foo.Bar'],
	index: function() {
		var me = this,
		app = this.application,
		viewport = app.getViewport();
		//    	viewport.changeView(me.getFooBarView());
		viewport.changeView(Ext.create(app.getModuleClassName('foo.Bar', 'view')));
	}
});