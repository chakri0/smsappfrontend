import ReactS3Client from 'react-aws-s3-typescript';
import { type UploadResponse } from 'react-aws-s3-typescript/dist/types';

export const s3Config = {
	bucketName: process.env.BUCKET_NAME ?? '',
	region: process.env.REGION ?? 'ap-south-1',
	accessKeyId: process.env.ACCESS_KEY ?? 'ABCD12EFGH3IJ4KLMNO5',
	secretAccessKey: process.env.SECRET_ACCESS_KEY ?? '',
};

export const uploadFile = async (file: File): Promise<UploadResponse> => {
	const s3 = new ReactS3Client(s3Config);
	const res = await s3.uploadFile(file);
	return res;
};
