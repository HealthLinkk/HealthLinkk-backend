import express from 'express';

const router = express.Router();





import { PatientSignUp , login ,ProfilePicUpload ,DoctorSignUp, getAllUsers, ProfileEdit, AddPharmacy,  forgetPasssword, verifyOtp, resetPassword,sendOTP } from '../controllers/user.js';
 import { auth, authAdminSup ,authDoctor ,authPatient ,authPharmacist } from '../middlewares/auth.js'; 



router
  .route('/PatientSignUp')
  .post(PatientSignUp);

router
  .route('/sendOTP')
  .post(sendOTP)

router
  .route('/forgetPassword')
  .post(forgetPasssword)

  router
  .route('/resetPassword')
  .post(resetPassword)
router
  .route('/verifyOTP')
  .post(verifyOtp)


  router
  .route('/DoctorSignup')
  .post(DoctorSignUp);

router
  .route('/login')
  .post(login);

router
  .route('/updatePicture')
  .patch(authDoctor,ProfilePicUpload);

router
  .route('/AllUsers')
  .get(authAdminSup,getAllUsers)

router
  .route('/editProfile')
  .patch(auth,ProfileEdit)

  router
  .route('/addPharmacy')
  .post(AddPharmacy)


 export default  router;