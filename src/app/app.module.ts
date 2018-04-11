import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import {MetaCoinService, Web3Service} from '../services/services';
import { MetacoinComponent } from './metacoin/metacoin.component';
import { CrowdfundComponent } from './crowdfund/crowdfund.component'

const SERVICES = [
  MetaCoinService,
  Web3Service,
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
    CrowdfundComponent
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
