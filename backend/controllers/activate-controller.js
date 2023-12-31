const Jimp  = require('jimp')
const userService = require('../services/user-service')
const UserDto  = require ('../dtos/user-dto')
const path = require('path')


class ActivateController {

   async activate(req,res){
       
       const {name, avatar} = req.body;

      //  console.log("name",name )
      //  console.log("avatar",avatar )

       if(!name || !avatar){
        res.status(400).json({message:"All fields are required"})
       }
      
       const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
        'base64');
      
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`

    // // 32478362874-3242342342343432.png

     try {
        
      const jimpResp = await Jimp.read(buffer);

      jimpResp.resize(150,Jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`));

     } catch (error) {

       res.status(500).json({message : 'Could not process the image '});   

     }

      
      
     const userId = req.user._id;
    //  res.json({message:"ok"})

      

      try {
        const user = await userService.findUser({_id:userId});

        if(!user){
          res.status(404).json({message: 'User not found'})
        }
  
        user.activated = true;
        user.name = name;
        user.avatar = `/storage/${imagePath}`;
  
        user.save();
        
        res.json({user: new UserDto(user), auth: true});

      } catch (error) {
        
        res.status(500).json({message:'Something went wrong'})
        
      }


    }
}

module.exports = new ActivateController();