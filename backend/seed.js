const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const Admin = require("./models/Admin");
const Student = require("./models/student");

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        // ── Clear existing data ──────────────────────
        await Admin.deleteMany({});
        await Student.deleteMany({});
        console.log("Cleared existing admins and students");

        // ── Seed Admin ───────────────────────────────
        const hashedAdminPassword = await bcrypt.hash("admin123", 10);
        await Admin.create({
            firstName: "Super",
            lastName: "Admin",
            email: "admin@studenthub.com",
            password: hashedAdminPassword,
            gender: "Male",
            imgURL: "",
        });
        console.log("✅ Admin created");

        // ── Seed Students ────────────────────────────
        const students = [
            { firstName: "Rahul",   lastName: "Sharma",  email: "rahul@studenthub.com",   gender: "Male"   },
            { firstName: "Priya",   lastName: "Patel",   email: "priya@studenthub.com",   gender: "Female" },
            { firstName: "Aarav",   lastName: "Mehta",   email: "aarav@studenthub.com",   gender: "Male"   },
            { firstName: "Sneha",   lastName: "Reddy",   email: "sneha@studenthub.com",   gender: "Female" },
            { firstName: "Vikram",  lastName: "Singh",   email: "vikram@studenthub.com",  gender: "Male"   },
        ];

        const hashedStudentPassword = await bcrypt.hash("student123", 10);

        for (const student of students) {
            await Student.create({
                ...student,
                password: hashedStudentPassword,
                imgURL: "",
                courses: [],
            });
        }
        console.log("✅ Students created");

        console.log("\n🎉 Database seeded successfully!");
        console.log("─────────────────────────────────");
        console.log("Admin   → admin@studenthub.com   / admin123");
        console.log("Student → rahul@studenthub.com   / student123");
        console.log("─────────────────────────────────");

    } catch (err) {
        console.error("Seeding failed:", err.message);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    }
};

seedDatabase();