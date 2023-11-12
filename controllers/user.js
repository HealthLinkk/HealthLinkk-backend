import Patient from '../models/patient.js' ;
import Doctor from '../models/doctor.js' ;
import User from '../models/user.js' ;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import upload from '../middlewares/multerConfig.js'


export async function PatientSignUp(req, res, next) {
      try{
      const hash = await bcrypt.hash(req.body.password, 10);
      const existingUser = await User.findOne({
        $or: [{ email: req.body.email }, { numTel: req.body.numTel }],
      });
       if (existingUser) {
           return res.status(400).json({ message: "It seems you already have an account, please log in instead." }); }

      const user = new Patient({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            numTel : req.body.numTel,
            dateNaiss: req.body.dateNaiss,
            location: req.body.location,
            role: 'Patient', 
      });
        
          await user.save();
          return res.status(201).json({ message: 'Patient created!' });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
  
  };


export  async function ProfilePicUpload (req,res,next){
    upload.single('picture')(req, res,async (err) => {
      if (err) {   
        return res.status(500).json({ error: err.message }); 
      } 
      
      try {         
      const authenticatedEmail = req.auth.email; 
      if (authenticatedEmail !== req.body.email) {
        return res.status(403).json({ error: 'Permission denied. You can only change your own picture.' });
      }

     const user = await User.findOneAndUpdate(
         { email: req.body.email },
         { picture: req.file.path },
         { new: true } 
         );             
         if (!user) {
          return res.status(404).json({ error: 'User not found' });
          }
                        
         return res.status(200).json({ message: 'Profile picture updated', user });
         } catch (error) {
            return res.status(500).json({ error: 'Failed to update profile picture' });  
        }
    })     
    
  };

export function DoctorSignUp(req,res,next){
  bcrypt.hash(req.body.password, 10)
  .then((hash) => {
    const user = new Doctor({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      numTel : req.body.numTel,
      location: req.body.location,
      role: 'Doctor', 
    });

    user.save()
      .then(() => res.status(201).json({ message: 'Doctor created!' }))
      .catch((error) => res.status(400).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));

};
  

 export function login (req,res,next) {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id ,
                          email: user.email,
                          role: user.role,
                          numTel: user.numTel,
                        },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
                
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};