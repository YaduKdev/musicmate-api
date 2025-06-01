import User from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // check if registered user
    const user = await User.findOne({ clerkId: id });

    // new user
    if (!user) {
      await User.create({
        clerkId: id,
        firstName,
        lastName,
        imageUrl,
      });

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};
