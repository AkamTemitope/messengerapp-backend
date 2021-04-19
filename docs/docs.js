//DOCUMENTATION

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: All user routes
 *   - name: contacts
 *     description: All contact routes
 *   - name: groups
 *     description: All group routes
 *
 */



// Users

/**
 * @swagger
 * /users/exist:
 *  get:
 *   tags:
 *   - users
 *   summary: user exists
 *   description: Check if user exists
 *   parameters:
 *   - name: "e"
 *     in: "query"
 *     description: "user's email"
 *     required: true
 *     type: string
 *   responses:
 *     200:
 *      description: true if user exist and vise versa 
 *     500:
 *      description: error occured  
 * */  

/**
 * @swagger
 * /users/all:
 *  get: 
 *   tags:
 *   - users
 *   summary: All users
 *   description: Get all users
 *   responses:
 *     201:
 *      description: success getting users
 *      schema:
 *        type: array
 *        items:
 *          $ref: "#/conponents/schemas/User"
 *     500:
 *      description: error getting users  
 * */ 

/**
 * @swagger
 * /users/user/{id}:
 *  get:
 *   tags:
 *   - users
 *   summary: get user 
 *   description: get user's info by id
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "user's id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success getting user info
 *     500:
 *      description: error getting user info  
 * */ 

/**
 * @swagger
 * /users/email:
 *  get:
 *   tags:
 *   - users
 *   summary: get user 
 *   description: get user's info by email
 *   parameters:
 *   - name: "e"
 *     in: "query"
 *     description: "user's email"
 *     required: true
 *     type: string
 *   responses:
 *     201:
 *      description: success getting user info
 *     500:
 *      description: error getting user info  
 * */ 

/**
 * @swagger
 * /users/new:
 *  post: 
 *   tags:
 *   - users
 *   summary: post new user
 *   description: create a new user
 *   requestBody:
 *     description: The user object that needs to be added to database
 *     content: 
 *       application/json: 
 *         schema: 
 *           type: "object"
 *           properties:
 *             username:
 *               type: string
 *             photoUrl:
 *              type: string
 *             email:
 *               type: string
 *     required: true 
 *   responses:
 *     201:
 *      description: success creating user
 *     500:
 *      description: error creating user 
 * */ 

/**
 * @swagger
 * /users/updateName/{id}:
 *  patch: 
 *   tags:
 *   - users
 *   summary: update user name
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "user's id"
 *     required: true
 *     type: string
 *     format: uuid
 *   requestBody:
 *     description: object with new username
 *     content: 
 *       application/json: 
 *         schema: 
 *           type: object 
 *           properties:  
 *             username: 
 *               type: string 
 *   responses:
 *     201:
 *      description: success updating username
 *     500:
 *      description: error updating username 
 * */ 

/**
 * @swagger
 * /users/updatePhoto/{id}:
 *  patch: 
 *   tags:
 *   - users
 *   summary: update user photo
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "user's id"
 *     required: true
 *     type: string
 *     format: uuid
 *   requestBody:
 *     description: object with new photoUrl
 *     content: 
 *       application/json: 
 *         schema: 
 *           type: object 
 *           properties:  
 *             photoUrl: 
 *               type: string 
 *   responses:
 *     201:
 *      description: success updating username
 *     500:
 *      description: error updating username 
 * */ 


/// Contacts

/**
 * @swagger
 * /contacts/all:
 *  get: 
 *   tags:
 *   - contacts
 *   summary: All contacts
 *   description: Get all contacts
 *   responses:
 *     201:
 *      description: success getting contacts
 *      schema:
 *        type: array
 *        items:
 *          $ref: "#/conponents/schemas/Contact"
 *     500:
 *      description: error getting contacts  
 * */ 

/**
 * @swagger
 * /contacts/{id}:
 *  get:
 *   tags:
 *   - contacts
 *   summary: get contact 
 *   description: get contact info by id
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "contact id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success getting contact info
 *     500:
 *      description: error getting contact info  
 * */ 

/**
 * @swagger
 * /contacts/new:
 *  post: 
 *   tags:
 *   - contacts
 *   summary: post new contact
 *   description: create a new contact
 *   requestBody:
 *     description: The contact object that needs to be added to database
 *     content: 
 *       application/json: 
 *         schema: 
 *           type: object
 *           properties:
 *             contact:
 *               type: object
 *               properties: 
 *                 members:
 *                   type: array
 *                   items: 
 *                     type: string 
 *     required: true 
 *   responses:
 *     201:
 *      description: success creating contact
 *     500:
 *      description: error creating contact 
 * */ 

/**
 * @swagger
 * /contacts/newMessage/{id}:
 *  post: 
 *   tags:
 *   - contacts
 *   summary: post new message to contact
 *   description: create a new message and add to contact messages
 *   parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "contact id"
 *       required: true
 *       type: string
 *       format: uuid
 *   requestBody:
 *     description: The message object 
 *     content: 
 *       application/json: 
 *         schema: 
 *           type: object
 *           properties:
 *             message:
 *               type: object
 *               properties:
 *                 from:
 *                  type: string
 *                 body:
 *                  type: string
 *                 timestamp:
 *                  type: string
 *                  format: date-time
 *     required: true 
 *   responses:
 *     201:
 *      description: success creating message and adding in contact
 *     500:
 *      description: error creating message and adding in contact 
 * */ 

/**
 * @swagger
 * /contacts/updateBlock/{id}:
 *  patch: 
 *   tags:
 *   - contacts
 *   summary: update block status
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "contact id"
 *     required: true
 *     type: string
 *     format: uuid
 *   requestBody:
 *     description: object with block
 *     content: 
 *       application/json: 
 *         schema:  
 *           type: object
 *           properties:
 *             block:
 *               $ref: "#/components/schemas/Contact/properties/block"
 *   responses:
 *     201:
 *      description: success updating username
 *     500:
 *      description: error updating username 
 * */ 


/**
 * @swagger
 * /contacts/deleteContact/{id}:
 *  delete:
 *   tags:
 *   - contacts
 *   summary: delete contact 
 *   description: delete contact by id
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "contact id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success deleting contact
 *     500:
 *      description: error deleting contact  
 * */ 

/**
 * @swagger
 * /contacts/deleteMessage/{id}:
 *  delete: 
 *   tags:
 *   - contacts
 *   summary: delete contact message
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "contact id"
 *     required: true
 *     type: string
 *     format: uuid
 *   - name: "_id"
 *     in: "query"
 *     description: "message id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success deleting contact message
 *     500:
 *      description: error deleting contact message
 * */

/**
 * @swagger
 * /contacts/deleteMessages/{id}:
 *  delete:
 *   tags:
 *   - contacts
 *   summary: delete contact messages
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "contact id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success deleting contact messages
 *     500:
 *      description: error deleting contact messages
 * */ 


/// GROUPS



/**
 * @swagger
 * /groups/all:
 *  get: 
 *   tags:
 *   - groups
 *   summary: All groups
 *   description: Get all groups
 *   responses:
 *     201:
 *      description: success getting groups
 *      schema:
 *        type: array
 *        items:
 *          $ref: "#/conponents/schemas/Group"
 *     500:
 *      description: error getting groups  
 * */ 

/**
 * @swagger
 * /groups/{id}:
 *  get:
 *   tags:
 *   - groups
 *   summary: get group 
 *   description: get group info by id
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "group id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success getting group info
 *     500:
 *      description: error getting group info  
 * */ 

/**
 * @swagger
 * /groups/new:
 *  post: 
 *   tags:
 *   - groups
 *   summary: post new group
 *   description: create a new group
 *   requestBody:
 *     description: The group object that needs to be added to database
 *     content: 
 *       application/json: 
 *         schema: 
 *           type: object
 *           properties:
 *             group:
 *               type: object
 *               properties: 
 *                 groupname:
 *                   type: string
 *                 photoUrl:
 *                   type: string
 *                 description:
 *                   type: string
 *                 members:
 *                   type: array
 *                   items: 
 *                     type: string 
 *     required: true 
 *   responses:
 *     201:
 *      description: success creating group
 *     500:
 *      description: error creating group 
 * */ 

/**
 * @swagger
 * /groups/newMessage/{id}:
 *  post: 
 *   tags:
 *   - groups
 *   summary: post new message to group
 *   description: create a new message and add to group messages
 *   parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "group id"
 *       required: true
 *       type: string
 *       format: uuid
 *   requestBody:
 *     description: The message object 
 *     content: 
 *       application/json: 
 *         schema: 
 *           type: object
 *           properties:
 *             message:
 *               type: object
 *               properties:
 *                 from:
 *                  type: string
 *                 body:
 *                  type: string
 *                 timestamp:
 *                  type: string
 *                  format: date-time
 *     required: true 
 *   responses:
 *     201:
 *      description: success creating message and adding in group
 *     500:
 *      description: error creating message and adding in group 
 * */ 

/**
 * @swagger
 * /groups/addMember/{id}:
 *  patch: 
 *   tags:
 *   - groups
 *   summary: add new member to group
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "group id"
 *     required: true
 *     type: string
 *     format: uuid
 *   requestBody:
 *     description: member id
 *     content: 
 *       application/json: 
 *         schema:  
 *           type: object
 *           properties:
 *             _id:
 *                type: string
 *                format: uuid
 *   responses:
 *     201:
 *      description: success adding new member
 *     500:
 *      description: error adding new member
 * */ 

/**
 * @swagger
 * /groups/updateName/{id}:
 *  patch: 
 *   tags:
 *   - groups
 *   summary: update groupname
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "group id"
 *     required: true
 *     type: string
 *     format: uuid
 *   requestBody:
 *     description: new groupname
 *     content: 
 *       application/json: 
 *         schema:  
 *           type: object
 *           properties:
 *             groupname:
 *               type: string
 *   responses:
 *     201:
 *      description: success updating groupname
 *     500:
 *      description: error updating groupname 
 * */ 

/**
 * @swagger
 * /groups/updatePhoto/{id}:
 *  patch: 
 *   tags:
 *   - groups
 *   summary: update group photo
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "group id"
 *     required: true
 *     type: string
 *     format: uuid
 *   requestBody:
 *     description: new photoUrl
 *     content: 
 *       application/json: 
 *         schema:  
 *           type: object
 *           properties:
 *             photoUrl:
 *               type: string
 *   responses:
 *     201:
 *      description: success updating group photoUrl
 *     500:
 *      description: error updating group photoUrl 
 * */ 

/**
 * @swagger
 * /groups/updateDescription/{id}:
 *  patch: 
 *   tags:
 *   - groups
 *   summary: update group description
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "group id"
 *     required: true
 *     type: string
 *     format: uuid
 *   requestBody:
 *     description: new group description
 *     content: 
 *       application/json: 
 *         schema:  
 *           type: object
 *           properties:
 *             description:
 *               type: string
 *   responses:
 *     201:
 *      description: success updating group description
 *     500:
 *      description: error updating group description 
 * */ 


/**
 * @swagger
 * /groups/deleteGroup/{id}:
 *  delete:
 *   tags:
 *   - groups
 *   summary: delete group 
 *   description: delete group by id
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "group id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success deleting group
 *     500:
 *      description: error deleting group  
 * */ 

/**
 * @swagger
 * /groups/deleteMember/{id}:
 *  delete: 
 *   tags:
 *   - groups
 *   summary: delete group member
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "group id"
 *     required: true
 *     type: string
 *     format: uuid
 *   - name: "_id"
 *     in: "query"
 *     description: "member id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success deleting group member
 *     500:
 *      description: error deleting group member
 * */

/**
 * @swagger
 * /groups/deleteMessage/{id}:
 *  delete: 
 *   tags:
 *   - groups
 *   summary: delete group message
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "group id"
 *     required: true
 *     type: string
 *     format: uuid
 *   - name: "_id"
 *     in: "query"
 *     description: "message id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success deleting group message
 *     500:
 *      description: error deleting group message
 * */

/**
 * @swagger
 * /groups/deleteMessages/{id}:
 *  delete:
 *   tags:
 *   - groups
 *   summary: delete group messages
 *   parameters:
 *   - name: "id"
 *     in: "path"
 *     description: "group id"
 *     required: true
 *     type: string
 *     format: uuid
 *   responses:
 *     201:
 *      description: success deleting group messages
 *     500:
 *      description: error deleting group messages
 * */ 





//// DATA SCHEMA

/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     User:
 *       type: "object"
 *       properties:
 *         _id:
 *            type: string
 *            format: uuid
 *         username:
 *            type: string
 *         photoUrl:
 *            type: string
 *         email:
 *            type: string
 *         is_active:
 *            type: boolean
 *            default: false
 *         contacts:
 *            type: array
 *            items: 
 *              $ref: "#/components/schemas/Contact"
 *         groups:
 *            type: array
 *            items: 
 *              $ref: "#/components/schemas/Group"
 */ 


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   Contact:
 *     type: object
 *     properties:
 *       _id:
 *          type: string
 *          format: uuid
 *       created_at:
 *         type: string
 *         format: date-time
 *         default: date-time
 *       block:
 *         type: object
 *         properties:
 *           from: 
 *             type: string
 *           status: 
 *             type: boolean
 *             default: false
 *       members:
 *         type: array
 *         items: 
 *           $ref: "#/components/schemas/User"
 *       messages:
 *         type: array
 *         items: 
 *           $ref: "#/components/schemas/Message"
 *       last_message:
 *         $ref: "#/components/schemas/Message"
 */

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   Group:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: string
 *         format: uuid
 *       groupname:
 *         type: string
 *       description:
 *         type: string
 *       photoUrl:
 *         type: string
 *       created_at:
 *         type: string
 *         format: date-time
 *         default: date-time
 *       members:
 *         type: array
 *         items: 
 *           $ref: "#/components/schemas/User"
 *       messages:
 *         type: array
 *         items: 
 *           $ref: "#/components/schemas/Message"
 *       last_message:
 *         $ref: "#/components/schemas/Message"
 */ 

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   Message:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: string
 *         format: uuid
 *       from:
 *         $ref: "#/components/schemas/User"
 *       body:
 *         type: string
 *       timestamp:
 *         type: string
 *         format: date-time
 *         default: date-time
 *      
 */