import axios from "axios";
require("dotenv").config();

export class client {
  async createUser({
    firstName,
    lastName,
    email,
  }: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    console.log(firstName, lastName, email, "from client");

    try {
      const res = await axios.post(
        `http://localhost:3000/api/user/createUser`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async isUserPresent({ email }: { email: string }) {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/isUserPresent`,
        {
          email: email,
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async addFile({
    key,
    downloadLink,
    deleteLink,
    email,
    size,
    fileType,
  }: {
    key: string;
    downloadLink: string;
    deleteLink: string;
    email: string;
    size: number;
    fileType: string;
  }) {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/file/addFile`,
        {
          email: email,
          key: key,
          downloadLink: downloadLink,
          size: size,
          fileType: fileType,
          deleteLink: deleteLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getFileDetails({ email }: { email: string }) {
    try {
      const res = await axios.post(
        "/api/file/getFileDetails",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteFile({ userId, fileName }: { userId: number; fileName: string }) {
    try {
      await axios.post(`http://localhost:3000/api/file/deleteFile`, {
        userId: userId,
        fileName: fileName,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
