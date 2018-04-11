import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import {MetaCoinService, Web3Service, TokenService} from '../services/services';
import { MetacoinComponent } from './metacoin/metacoin.component';
import { CrowdfundComponent } from './crowdfund/crowdfund.component';
import { TokenComponent } from './token/token.component'

const SERVICES = [
  MetaCoinService,
  Web3Service,
  TokenService
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    MetacoinComponent,
    CrowdfundComponent,
    TokenComponent
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
