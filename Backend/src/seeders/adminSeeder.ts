import dotenv from "dotenv";
import { connectDB } from "../config/db";
import { User } from "../models/user.model";

dotenv.config();

const seedAdmin = async (): Promise<void> => {
  try {
    await connectDB();

    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminName || !adminEmail || !adminPassword) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD missing in .env file"
      );
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Admin seeding failed:", error);
    process.exit(1);
  }
};

seedAdmin();