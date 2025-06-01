import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// Cloudinary Upload Function
const uploadToCloudinary = async (file) => {
  try {
    const upload = cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return upload.secure_url;
  } catch (error) {
    console.log("Cloudinary Upload Error", error);
    throw new Error("Error uploading to Cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || req.files.audioFile || req.files.imageFile) {
      return res.status(400).json("You Havn't Uploaded All Necessary Files!");
    }

    const { title, artist, albumId, duration } = req.body;
    const { audioFile, imageFile } = req.files;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      duration,
      audioUrl,
      imageUrl,
      albumId: albumId || null,
    });

    await song.save();

    //Update Albums
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log("Error creating song", error);
    next(error);
  }
};
