const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.category.createMany({
      data: [
        { name: "Visual Arts" },
        { name: "Music Arts" },
        { name: "Dance Arts" },
        { name: "Theater Arts" },
        { name: "Other Arts" },
      ],
    });

    console.log("successfully seeded categories");
  } catch (error) {
    console.error("Error seeding the categories: ", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
