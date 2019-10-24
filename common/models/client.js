'use strict';
const clients = require('../../clientsdata.json').clients;
const Policies = require('../../policiesdata.json').policies;

module.exports = function(Client) {

     /**
     * GetById
     * @description Get user data filtered by user id -> Can be accessed by users with role "users" and "admin" 
     * @param {Req} req (headers.authorization)
     * @param {id} id (Client Id )
     * @return object 
     **/
    Client.getById = async function(req, id) {
       const authorizedUser = clients.find(x => x.id === req.headers.authorization && (x.role === 'users' || x.role==='admin'));
        if (!authorizedUser){
            return {"code": 401,"message":"Not authorized" };
        }
        
        return clients.find(x => x.id === id);              
    }
    Client.remoteMethod('getById', {
          http: {path: '/getById', verb: 'get'},
          accepts: [{arg: 'req', type: 'object', http: {source: 'req'}},
                    {arg: 'id', type: 'string',  required: true}],
          returns: { type: 'object', root: true }
    });


    /**
     * getByUserName
     * @description Get user data filtered by user name -> Can be accessed by users with role "users" and "admin" 
     * @param {Req} req (headers.authorization)
     * @param {email} id (Client email )
     * @return object 
     **/
    Client.getByUserName = async function(req, email) {
        const authorizedUser = clients.find(x => x.id === req.headers.authorization && (x.role === 'users' || x.role==='admin'));
        if (!authorizedUser){
            return {"code": 401,"message":"Not authorized" };
        }
        
        return clients.find(x => x.email === email);        
    }
    Client.remoteMethod('getByUserName', {
          http: {path: '/getByUserName', verb: 'get'},
          accepts: [{arg: 'req', type: 'object', http: {source: 'req'}},    
                    {arg: 'email', type: 'string', required: true}],
          returns: { type: 'object', root: true }
    });

    
    /**
     * getByPolicyNumber
     * @description  Get the user linked to a policy number -> Can be accessed by users with role "admin
     * @param {Req} req (headers.authorization)
     * @param {policyId} id (Policy Id)
     * @return object 
     **/
    Client.getByPolicyNumber = async function(req, policyId) {            
        const authorizedUser = clients.find(x => x.id === req.headers.authorization && x.role==='admin');
        if (!authorizedUser){
            return {"code": 401,"message":"Not authorized" };
        }
       
        const policy = Policies.find(x => x.id === policyId);                     
        return (policy ? clients.find(x => x.id === policy.clientId): null) ;        
    }
    Client.remoteMethod('getByPolicyNumber', {
          http: {path: '/getByPolicyNumber', verb: 'get'},
          accepts: [{arg: 'req', type: 'object', http: {source: 'req'}},      
                    {arg: 'policyId', type: 'string', required: true}],
          returns: { type: 'object', root: true }
    });

};
