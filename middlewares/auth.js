import jwt from 'jsonwebtoken' ;
 
const auth = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       const role = decodedToken.role;
       const email = decodedToken.email;
       const numTel = decodedToken.numTel;
       req.auth = {
           userId: userId,
           role : role,
           email: email, 
           numTel: numTel,   
       };
	next();
   } catch(error) {
       res.status(401).json({message : 'user is not authenticated'});
   }
};

 export default auth ;