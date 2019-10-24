
'use strict';
const clients = require('../../clientsdata.json').clients;
const Policies = require('../../policiesdata.json').policies;

module.exports = function(Policie) {

    /**
     * list
     * @description Get the list of policies linked to a user name -> Can be accessed by users with role "admin"
     * @param {Req} req (headers.authorization)
     * @param {email} id (Client email)
     * @return Array object 
     **/
    Policie.list = async function(req, email) {
        const authorizedUser = clients.find(x => x.id === req.headers.authorization && x.role==='admin');
        if (!authorizedUser){
            return {"code": 401,"message":"Not authorized" };
        }
         
        const client = clients.find(x => x.email === email); 
        return (client ? Policies.filter(x => x.clientId === client.id): []); 
    }
    Policie.remoteMethod('list', {
          http: {path: '/list', verb: 'get'},
          accepts: [{arg: 'req', type: 'object', http: {source: 'req'}},      
                    {arg: 'email', type: 'string', required: true}],
          returns: {arg: 'policies', type: 'string'}
    });

};
