declare module 'subtitle-converter' {
	export function convert(
		subtitleText: string,
		outputExtension: string,
		options: {
			removeTextFormatting: boolean;
			combineOverlapping: boolean;
		}
	): { subtitle: string; status: { success: boolean; failure: boolean } };
}
