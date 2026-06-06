import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // max 10MB

export const uploadFile = upload.single('matriz_curricular'); // field name 'file'