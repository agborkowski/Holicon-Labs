# DRAFT DOCUMENT
@version 0.1

@author AgBorkowski <andrzejborkowski@gmail.com>

@copyright All rights reserved by **Holicon Sp. z o.o.**

@link http://holicon.pl

# Repository guide
* **extjs-mvc** shows right name convention, and some fixes instead of 
ExtJs MVC official documentation

# ExtJs MVC
## name convention

Name convention inspired me from cakephp framework [Inspired by cakephp][100]

![extjs mvc struct, server side framework + extjs][1]

* Models
	* Clases
		* singular, camel cased (APP.model.User, APP.model.UserDashboard)
	* File
		* singular, camel cased (User.js, UserDashboard.js)
* Store
	* Clases
		* plurar, camel cased (APP.store.Users, APP.store.UserDashboards)
	* File
		* plurar, camel cased (Users.js, UserDashboards.js)
* Controllers
	* Clases
		* plurar, camel cased (APP.controller.Users, FV.controller.UserDashboards)
	* File
		* plurar, camel cased (Users.js, UserDashboards.js)
* Views
	* Path
		controller name, underscored (/app/view/users, /app/view/user_dashboards)
	* File
		* action name, camel cased (Users.js, UserDashboards.js)

[1]: http://images35.fotosik.pl/650/be678981835da637.jpg
[100]: http://cakephp.org/files/Resources/CakePHP-1.2-Cheatsheet.pdf
