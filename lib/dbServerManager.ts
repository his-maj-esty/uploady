import { PrismaClient } from "@prisma/client";
import { FileDetails, UserDetails } from "./types";

const prisma = new PrismaClient();

export class dbManager {
  static prisma: PrismaClient;
  constructor() {
    if (!dbManager.prisma) {
      dbManager.prisma = new PrismaClient();
    }
  }

  async createUser({
    firstName,
    lastName,
    email,
  }: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    try {
      if (await this.isUserPresent({ email })) {
        return "user already exists";
      }
      const response = await dbManager.prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async isUserPresent({ email }: { email: string }) {
    try {
      const response = await dbManager.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addFile({
    email,
    key,
    size,
    fileType,
    downloadLink,
    deleteLink,
  }: {
    email: string;
    key: string;
    size: number;
    fileType: string;
    downloadLink: string;
    deleteLink: string;
  }) {
    try {
      const response = await dbManager.prisma.user.update({
        where: {
          email: email,
        },
        data: {
          files: {
            create: {
              key: key,
              downloadLink: downloadLink,
              fileType: fileType,
              size: size,
              deleteLink: deleteLink,
            },
          },
        },
      });
      console.log("response from addfile db manager ", response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFileDetails({ email }: { email: string }) {
    try {
      const response = await dbManager.prisma.user.findMany({
        where: {
          email: email,
        },
        include: {
          files: {
            select: {
              key: true,
              downloadLink: true,
              fileType: true,
              size: true,
              deleteLink: true,
              userId: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteFile({ userId, fileName }: { userId: number; fileName: string }) {
    try {
      const res = await prisma.file.delete({
        where: {
          userId: userId,
          key: fileName,
        },
      });

      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
