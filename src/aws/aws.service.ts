import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { createEntityId } from 'src/common/util/create.entity.id';

@Injectable()
export class AwsService {
  private s3;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
    console.log(file);
    const { buffer, mimetype } = file;
    const bucketName = process.env.AWS_S3_BOOK_BUCKET;
    const params = {
      Bucket: bucketName,
      Key: `${key}/${createEntityId()}`,
      Body: buffer,
      ContentType: mimetype,
    };

    try {
      const uploadResult = await this.s3.upload(params).promise();
      return uploadResult.Location;
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
}
