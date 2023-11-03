import express from 'express';

const router = express.Router();



import { PatientSignUp , login } from '../controllers/user.js';
  



router
  .route('/PatientSignup')
  .post(PatientSignUp);

router
  .route('/login')
  .post(login);


export default  router;