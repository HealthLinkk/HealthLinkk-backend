import express from 'express';

const router = express.Router();

import { PatientSignUp , login ,ProfilePicUpload ,DoctorSignUp } from '../controllers/user.js';
 import { auth, authAdminSup ,authDoctor ,authPatient ,authPharmacist } from '../middlewares/auth.js'; 



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
  .patch(authDoctor,ProfilePicUpload);

 export default  router;