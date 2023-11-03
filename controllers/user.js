import Patient from '../models/user.js' ;
import bcrypt from 'bcrypt';

export function PatientSignUp (req,res,next) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new Patient({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash ,
        dateNaiss : req.body.dateNaiss,
        address : req.body.address,
        role : 'Patient',

      });
      user.save()
        .then(() => res.status(201).json({ message: 'Patient created !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};

 export function login (req,res,next) {

};