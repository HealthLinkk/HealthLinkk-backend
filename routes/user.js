import express from 'express';

const router = express.Router();

import auth from '../middlewares/auth.js';



import { PatientSignUp , login ,ProfilePicUpload ,DoctorSignUp } from '../controllers/user.js';
  



router
  .route('/PatientSignup')
  .post(PatientSignUp);

  router
  .route('/DoctorSignup')
  .post(DoctorSignUp);

router
  .route('/login')
  .post(login);

router
  .route('/updatePicture')
  .patch(auth,ProfilePicUpload);

 export default  router;