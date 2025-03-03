declare namespace NodeJS {
	interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_verifyTokenUrl: string;
    REACT_APP_x_api_key: string;
    REACT_APP_loginUrl: string;
    REACT_APP_registerUrl: string;
	}
}