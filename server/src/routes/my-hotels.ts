import { Router } from 'express';
import { upload } from '../middleware/image-upload';

const router = Router();

router.post('/', upload.array('imagesFiles', 6));
