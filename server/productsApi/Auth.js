var bcrypt = require('bcrypt');

class Auth {
    static users = [{userId: "Mickey", password: "simplepassword", role: "user"},
                    {userId: "Minnie", password: "complicatedpassword", role: "admin"}
            ];

    static getAuthenticated(authDetails) {
        const user = this.getCredentials(authDetails);
        let callingUser = this.users.find(({userId}) => userId === user[0]);
        if(callingUser) {
            const hash = bcrypt.compareSync(callingUser.password, user[1]);
            if(hash){
                return callingUser;
            }
        }
        return {};
    }
    
    static getAuthorised(authDetails) {
        const user = this.getAuthenticated(authDetails);
        if(user && user.role === 'admin') {
            return user;
        }
        return {};
    }
    
    static getCredentials(authDetails) {
        const base64Credentials =  authDetails.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const user = credentials.split('-');
        return user;
    }
}

module.exports = Auth;

