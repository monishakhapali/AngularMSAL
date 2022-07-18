import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG   } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { PublicPageComponent } from './public-page/public-page.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// export function MSALInstanceFactory(): IPublicClientApplication{
//   return new PublicClientApplication({
//     auth:{
//       clientId: '74fab638-918b-48b7-ad7c-f7f51c16d452',
//       redirectUri : 'http://localhost:4200/'
//     }
//   })
// }


export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '74fab638-918b-48b7-ad7c-f7f51c16d452', // PPE testing environment
      // authority: 'https://login.microsoftonline.com/common', // Prod environment. Uncomment to use.
      //authority: 'https://login.windows-ppe.net/common', // PPE testing environment.
      redirectUri: 'http://localhost:4200/',
      postLogoutRedirectUri: 'http://localhost:4200/'
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']); // Prod environment. Uncomment to use.
  //Every API has acopes, this should be added here ex - user.read, this gives a popup to the user to allow read access.
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read','Mail.Read']);

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap
  };
}




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    PublicPageComponent,
    RestrictedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    HttpClientModule
   
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi:true
    },
    
    {
    provide : MSAL_INSTANCE,
    useFactory : MSALInstanceFactory
  },
  {
    provide : MSAL_INTERCEPTOR_CONFIG,
    useFactory : MSALInterceptorConfigFactory
  },
  MsalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
