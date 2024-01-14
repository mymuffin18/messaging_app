import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

let prisma;

if (process.env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = prismaClientSingleton();
  }
  prisma = global.prisma;
} else {
  prisma = prismaClientSingleton();
}

export default prisma;
