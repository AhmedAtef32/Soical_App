
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { userTokenInterceptor } from './core/interceptor/token/user-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes , withViewTransitions() , withInMemoryScrolling({scrollPositionRestoration: 'top'})),
      provideClientHydration(withEventReplay()),
      provideHttpClient(withFetch(), withInterceptors([userTokenInterceptor])),
      provideAnimations(),
      provideToastr(),

    ]
};
