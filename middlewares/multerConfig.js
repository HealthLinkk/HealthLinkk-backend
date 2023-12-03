

import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profile-pictures')
  },
  filename: function (req, file, cb) {
    const fileExt = file.originalname.split('.').pop();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExt)
  }
})

const upload = multer({ storage: storage })

export default upload ; 