import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    res.status(401).json({ message: "Unauthorized User: Login to continue" });
    return;
  }

  next();
};

export const checkAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      res
        .status(403)
        .json({ message: "Unauthorized Access! You must be an Admin" });
      return;
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
