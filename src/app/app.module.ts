import {
  APP_INITIALIZER,
  NgModule,
  Optional,
  PLATFORM_ID,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { ServiceWorkerModule } from "@angular/service-worker";
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { isPlatformServer } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { environment } from "../environments/environment";
import { ReactiveFormsModule } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { QuillModule } from "ngx-quill";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule.withServerTransition({ appId: "serverApp" }),
        IonicModule.forRoot(),
        ReactiveFormsModule,
        AppRoutingModule,
        ComponentsModule,
        QuillModule.forRoot(),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        ServiceWorkerModule.register("/ngsw-worker.js", {
            enabled: environment.production,
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        })], providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: APP_INITIALIZER,
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            useFactory: (platformId: object, response: any) => {
                return () => {
                    // In the server.ts we added a custom response header with information about the device requesting the app
                    if (isPlatformServer(platformId)) {
                        if (response && response !== null) {
                            // Get custom header from the response sent from the server.ts
                            const mobileDeviceHeader = response.get("mobile-device");
                            // Set Ionic config mode?
                        }
                    }
                };
            },
            deps: [PLATFORM_ID, [new Optional(), RESPONSE]],
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        Storage,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
