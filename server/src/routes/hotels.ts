import { Router } from 'express';
import { upload } from '../middleware/image-upload';
import { addHotel } from '../controllers/my-hotels';
import { verifyToken } from '../middleware/auth';
import { validateHotel } from '../middleware/hotel';

const router = Router();

router.post(
  '/add',
  verifyToken,
  validateHotel,
  upload.array('imagesFiles', 6),
  addHotel
);

export default router;
