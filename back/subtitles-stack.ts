import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { App, Stack, StackProps } from '@aws-cdk/core';
import { SubtitlesToolsBackend } from './subtitlesBackend/subtitles-backend';
import { SPADeploy } from 'cdk-spa-deploy';
import { join } from 'path';

export class SubtitlesToolsAppStack extends Stack {
	constructor(scope: App, id: string, props?: StackProps) {
		super(scope, id, props);

		// Instantiate backend Construct
		const srtBackend = new SubtitlesToolsBackend(
			this,
			'SubtitleToolsBackend'
		);

		// Setup gateway API
		const api = new LambdaRestApi(this, 'SubtitleApi', {
			handler: srtBackend.handler,
			proxy: false,
		});

		api.root.addMethod('ANY');

		const subtitles = api.root.addResource('subtitles');
		subtitles.addMethod('POST');

		const subtitle = subtitles.addResource('{id}');
		subtitle.addMethod('GET');

		new SPADeploy(this, 'SubtitleFrontApp').createSiteWithCloudfront({
			indexDoc: 'index.html',
			websiteFolder: join(__dirname, '..', 'front', 'dist'),
		});
	}
}
