import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { Construct, StackProps } from '@aws-cdk/core';
import { join } from 'path';

export class SubtitlesToolsBackend extends Construct {
	// Create dynamoDb table
	subtitlesTable: Table = new Table(this, 'subtitles', {
		partitionKey: { name: 'id', type: AttributeType.STRING },
	});

	// Create Lambda handler
	handler = new Function(this, 'SubtitlesHandler', {
		code: Code.fromAsset(join(__dirname, '..', 'lambda')),
		handler: 'subtitles.handler',
		runtime: Runtime.NODEJS_14_X,
		environment: { tableName: this.subtitlesTable.tableName },
	});

	// Give handler access to DynamoDB table
	constructor(scope: Construct, id: string, _props?: StackProps) {
		super(scope, id);

		this.subtitlesTable.grantReadWriteData(this.handler);
	}
}
