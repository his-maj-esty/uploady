import "dotenv/config";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectRequest,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class FileUpload {
  static client: S3Client;
  constructor() {
    if (!FileUpload.client) {
      FileUpload.client = new S3Client({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
        region: process.env.AWS_REGION!,
      });
    }
  }

  async uploadAndGetURL(fileAsBuffer: ArrayBuffer, fileName: string) {
    // returns download link
    const input: PutObjectRequest = {
      Bucket: "uploady",
      Key: fileName,
      Body: fileAsBuffer,
    };

    try {
      const command = new PutObjectCommand(input);
      const response = await FileUpload.client.send(command);

      const [downloadUrl, deleteLink] = await this.getURLs(fileName);

      return [downloadUrl, deleteLink];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async getURLs(fileName: string) {
    const expirationTime = 3600 * 24; // 1 year

    const ObjectParams = {
      Bucket: "uploady",
      Key: fileName,
    };

    try {
      const getObjectCommand = new GetObjectCommand(ObjectParams);
      const deleteObjectCommand = new DeleteObjectCommand(ObjectParams);  // not performing delete and get. only to get urls
      
      //download url
      const downloadUrl = await getSignedUrl(
        FileUpload.client,
        getObjectCommand,
        {
          expiresIn: expirationTime,
        }
      );

      //delete url
      const deleteLink = await getSignedUrl(
        FileUpload.client,
        deleteObjectCommand,
        {
          expiresIn: expirationTime,
        }
      );

      return [downloadUrl, deleteLink];
    } catch (error) {
      console.log(error);
    }
  }
}
