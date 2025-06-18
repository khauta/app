// import { inject, provideAppInitializer } from '@angular/core';
// import { TranslateLangService } from './services/translate-lang.service';
// import { StartupService } from './services/startup.service';

// export function TranslateLangServiceFactory(
//   translateLangService: TranslateLangService
// ) {
//   return () => translateLangService.load();
// }

// export function StartupServiceFactory(startupService: StartupService) {
//   return () => startupService.load();
// }

// export const appInitializerProviders = [
//   provideAppInitializer(() => {
//         const initializerFn = (TranslateLangServiceFactory)(inject(TranslateLangService));
//         return initializerFn();
//       }),
//   provideAppInitializer(() => {
//         const initializerFn = (StartupServiceFactory)(inject(StartupService));
//         return initializerFn();
//       }),
// ];

import { inject, provideAppInitializer } from '@angular/core';
import { TranslateLangService } from './services/translate-lang.service';
import { StartupService } from './services/startup.service';
import { first } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

export function TranslateLangServiceFactory(): Observable<unknown> {
  const translateLangService = inject(TranslateLangService);
  return from(translateLangService.load()).pipe(first());
}

export function StartupServiceFactory(startupService: StartupService): () => Promise<unknown> {
  return () => Promise.resolve(startupService.load());
}

export const appInitializerProviders = [
  provideAppInitializer(() => TranslateLangServiceFactory()),
  provideAppInitializer(() => StartupServiceFactory(inject(StartupService))()),
];