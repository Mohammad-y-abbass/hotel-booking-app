import { Request, Response } from 'express';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();

export const addHotel = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }

    // Upload file to Firebase Storage
    const fileRef = ref(storage, `uploads/${req.file.originalname}`);
    await uploadBytes(fileRef, req.file.buffer);
  } catch (error) {
    console.log('Error creating hotel: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
