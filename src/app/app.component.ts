
import { Component, OnInit } from '@angular/core';
import { ResolveStart } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sso-angular-msal';

 

  constructor(private msalService : MsalService){
    
  }
  ngOnInit(): void {
   this.msalService.instance.handleRedirectPromise().then(
    (tokenResponse) => {
      let accountObj = null;
      if (tokenResponse !== null) {
        accountObj = tokenResponse.account;
        this.msalService.instance.setActiveAccount(tokenResponse.account);
      }
    }
   )
    
  }

  isLoggedIn() : boolean {
    return this.msalService.instance.getActiveAccount() != null
  }

  login(){
    //Does not go to the popup instead goes to the login page
    this.msalService.loginRedirect();

    // this.msalService.loginPopup().subscribe((response: AuthenticationResult) => 
    //   this.msalService.instance.setActiveAccount(response.account)
    // );
  }

  logout(){
    this.msalService.logout();
  }

 
}
