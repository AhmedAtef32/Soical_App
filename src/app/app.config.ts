
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { userTokenInterceptor } from './core/interceptor/token/user-token.interceptor';
import { errorsInterceptor } from './core/interceptor/errors/errors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes ,withHashLocation() ,withViewTransitions() , withInMemoryScrolling({scrollPositionRestoration: 'top'})),
      provideClientHydration(withEventReplay()),
      provideHttpClient(withFetch(), withInterceptors([userTokenInterceptor,errorsInterceptor])),
      provideAnimations(),
      provideToastr(),

    ]
};
