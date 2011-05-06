@author AgBorkowski <andrzejborkowski@gmail.com>

@copyright All rights reserved by **Holicon Sp. z o.o.**

@link http://holicon.pl

# Repository guide
* **extjs-mvc** shows right name convention, and some fixes instead of 
ExtJs MVC official documentation

# ExtJs MVC
## name convention
![extjs mvc struct, server side framework + extjs][1]
* Models
** Clases
*** singular, camel cased (APP.model.User, APP.model.UserDashboard)
** File
*** singular, camel cased (User.js, UserDashboard.js)
* Store
** Clases
*** plurar, camel cased (APP.store.Users, APP.store.UserDashboards)
** File
*** plurar, camel cased (Users.js, UserDashboards.js)
* Controllers
** Clases
*** plurar, camel cased (APP.controller.Users, FV.controller.UserDashboards)
** File
*** plurar, camel cased (Users.js, UserDashboards.js)

[1]: http://images35.fotosik.pl/650/be678981835da637.jpg