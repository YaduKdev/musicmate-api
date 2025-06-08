import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth().userId) {
    res.status(401).json({ message: "Unauthorized User: Login to continue" });
    return;
  }

  next();
};

export const checkAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth().userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized Access! You must be an Admin" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
