const UserModel = require('../models/user-model');

class UserService{
    
    async findUser(filter){
        
        try {
            const user = await UserModel.findOne(filter);
            return user;
          } catch (error) {
            console.error('Error finding user:', error);
            throw error;
          }
    }

    async createUser(data){
        
        const user = await UserModel.create(data);

        return user;
    }

}

module.exports =  new UserService()