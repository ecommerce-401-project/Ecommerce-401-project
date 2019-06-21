# Ecommerce-401-project
<!-- https://videogame-marketplace.herokuapp.com/api/-->

**Authors:** Floyd Orr, Skylar Monahan, Jacob Wendt, Michele Saba

**Version:** 1.0.0

## Overview
Video Game Marketplace is a place where game producers, players and internal admins can offer video games.


## File System
```
project
│   README.md
│   package.json
|   index.js    
│   Deployed on Heroku 
|    travis.yml
└───data
│   │_Mongo(mLabs).sql 
│___util
    mongoose-connect.js   
└───views
|
|____src  
  -auth
  |_routes
    |_auth-router.js
    middleware.js
    role-schema.js
_Middleware
  |_404.js
  |_error.js
_models
  admin-repos.js
  games-repo.js
  games-schema.js
  publisher-repo.js 
__routes
  admin-routes.js
  player-routes.js
  publisher-routes.js


```
### Geting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
###Prerequisites

###Deploying With 
1. Get code
 ```
   git clone https://github.com/ecommerce-401-project/Ecommerce-401-project.git
   ```
2. Get dependencies
 ```
   npm install
   ```
3. Get Mongo Collections work via Heroku Mongo add on 
   \i 
   ``` 
4. Start Node Server
```
   nodemon
   ``` 
### License
This project is licensed under the MIT License - see the LICENSE.md file for details
###Built With
1. Node.js
2. Heroku
3. Mongo
4. Swagger



