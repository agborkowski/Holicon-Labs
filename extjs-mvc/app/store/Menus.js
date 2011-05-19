Ext.define('APP.store.Menus', {
	extend: 'Ext.data.Store',

	//model: 'APP.model.Menu',

	root: {
			text: 'Modules',
			editable: false,
			href: '#/',
			allowDrop: false,
			draggable: true,
			children: [
			{
				text: 'Users',
				href: '#/users',
				allowDrop: false,
				editable: false,
				children: [
				{
					text: 'List Users',
					allowChildren: false,
					allowDrop: false,
					editable: false,
					leaf: true,
					href: '#/users/index',
					draggable: true
				},
				{
					text: 'Add User',
					href: '#/users/add',
					leaf: true,
					draggable: true
				}
				]
			},
			{
				text: 'Reports',
				href: '#/reports',
				allowDrop: false,
				editable: false
			},
			{
				text: 'Campaigns',
				href: '#/campaigns',
				allowDrop: false,
				editable: false
			}
			]
		}
});
