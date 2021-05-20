import { S3 } from 'aws-sdk';
import * as parser from 'lambda-multipart-parser';
import { convert } from 'subtitle-converter';
import { createReadStream, readFileSync, ReadStream, writeFileSync } from 'fs';

const bucketName = process.env.bucketName as string;

const s3 = new S3();

exports.handler = async function (event: AWSLambda.APIGatewayEvent) {
	const { httpMethod } = event;

	try {
		if (httpMethod === 'POST') {
			if (!event.body) {
				throw { error: 'missing file', code: 400 };
			}

			const multipartEvent = await parser.parse(event);

			const file = multipartEvent.files[0];
			const { subtitle, status } = convert(
				file.content.toString('utf8'),
				'.srt',
				{
					removeTextFormatting: true,
					combineOverlapping: true,
				}
			);

			if (status.success) {
				const name = file.filename.replace(/\.[a-zA-Z]{3}$/, '.srt');

				const s3Object = await saveFile(Buffer.from(subtitle, 'utf8'), name);
				return createResponse(s3Object);
			} else {
				return createResponse(status, 400);
			}
		}

		if (httpMethod === 'OPTIONS') {
			return createResponse('ok');
		}

		return createResponse('method_unsupported', 400);
	} catch (error) {
		console.log(error);
		if (error.error && error.code) {
			return createResponse(error.error, error.code);
		} else {
			return createResponse(error, 500);
		}
	}
};

function createResponse(response: any, statusCode: number = 200) {
	const body = JSON.stringify(response);
	return {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
		},
		statusCode,
		body,
	};
}

function saveFile(content: Buffer, name: string) {
	const date = new Date();
	date.setDate(date.getDate() + 1);
	const expirationDate = new Date(date);

	return s3.upload({
		Bucket: bucketName,
		Key: `subtitles/${name}`,
		Body: content,
		Expires: expirationDate
	}).promise();
}
