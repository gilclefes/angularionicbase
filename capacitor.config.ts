import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
	appId: "com.yabo.yaboclean",
	appName: "YaboClean",
	webDir: "dist/app/browser",
	bundledWebRuntime: false,
	plugins: {
		SplashScreen: {
			launchAutoHide: false,
		},
		/* FirebaseAuthentication: {
			skipNativeAuth: false,
			providers: ["google.com", "twitter.com", "facebook.com", "apple.com"],
		}, */
	},
};

export default config;
