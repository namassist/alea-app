const { PrismaClient } = require("@prisma/client");
const { users } = require("./data.js");

console.log(users);

const prisma = new PrismaClient();

const load = async () => {
  try {
    const totalUsers = await prisma.user.count();

    if (totalUsers !== 0) {
      // delete
      await prisma.user.deleteMany();
      console.log("Deleted records in users table");

      // truncate
      await prisma.$queryRaw`ALTER TABLE users AUTO_INCREMENT = 1`;
      console.log("reset users auto increment to 1");
    }

    // create
    await prisma.user.createMany({
      data: users,
    });
    console.log("Added users data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
