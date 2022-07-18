import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

const GRAPH_Mail_Endpoint='https://graph.microsoft.com/v1.0/me/messages'

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.css']
})
export class RestrictedPageComponent implements OnInit {
  
  name? : string = "";
  apiResponse : string="";
  constructor(private msalService : MsalService,private httpclient :HttpClient) { }

  ngOnInit(): void {
  }

  isLoggedIn() : boolean {
    return this.msalService.instance.getActiveAccount() != null
  }

  getName(): string {
    this.name =this.msalService.instance.getActiveAccount()?.name;
    return this.name!;
  }

  callProfile(){
    this.httpclient.get(GRAPH_ENDPOINT).subscribe(
      resp => {
        this.apiResponse = JSON.stringify(resp)
      }
    )
  }

  callMails(){
    this.httpclient.get(GRAPH_Mail_Endpoint).subscribe(
      resp => {
        this.apiResponse = JSON.stringify(resp)
      }
    )
  }

}
