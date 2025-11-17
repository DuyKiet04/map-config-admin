

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		
		interface PrivateEnv {
			S3_ENDPOINT: string;
			S3_ACCESS_KEY: string;
			S3_SECRET_KEY: string;
			S3_BUCKET: string;
			S3_KEY: string;
		}

		
	}
}

export {};