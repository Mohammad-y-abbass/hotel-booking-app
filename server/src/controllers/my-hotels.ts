import { Request, Response } from 'express';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Hotel from '../models/hotel';
import { HotelType } from '../models/hotel';

const storage = getStorage();

export const addHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const uploadPromises = imageFiles.map(async (file) => {
      const fileRef = ref(storage, `uploads/${file.originalname}`);
      await uploadBytes(fileRef, file.buffer);
      return getDownloadURL(fileRef);
    });

    const imageUrls = await Promise.all(uploadPromises);

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpload = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.log('Error creating hotel: ', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
