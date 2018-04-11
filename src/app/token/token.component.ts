import { Component, OnInit, NgZone } from '@angular/core';
import {Web3Service, TokenService} from '../../services/services'

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  account: any;
  accounts: any;

  balance: number;

  name: string;
  symbol: string;

  sendingAmount: number;
  recipientAddress: string;

  allowance: number;
  allowanceForAddress: string;

  checkAllowance: number;
  checkAllowanceAddress:string;

  fromAmount: number;
  fromAddress: string;

  // 0xf17f52151ebef6c7334fad080c5704d77216b732
  status: string;

  loading = "Loading...";
  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private tokenService: TokenService,
    ) {
      this.onReady();
  }

  ngOnInit() {
  }

  onReady = () => {
    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() => {
        this.refreshBalance();
        this.getName();
        this.getSymbol();
        // this.getAllAllowance();
      });
    }, err => alert(err))
  };

  refreshBalance = () => {
    this.tokenService.getBalance(this.account)
      .subscribe(value => {
        this.balance = value
      }, e => {this.setStatus('Error getting balance; see log.')})
  };
  
  getName = () => {
    this.tokenService.getName()
      .subscribe(value => {
        this.name = value
      }, e => {this.setStatus('Error getting name; see log.')})
  };

  getSymbol = () => {
    this.tokenService.getSymbol()
      .subscribe(value => {
        this.symbol = value
      }, e => {this.setStatus('Error getting symbol; see log.')})
  };


  transfer = () => {
    this.setStatus('Initiating transaction... (please wait)');

    this.tokenService.transfer(this.account, this.recipientAddress, this.sendingAmount)
      .subscribe(() =>{
        this.setStatus('Transaction complete!');
        this.refreshBalance();
      }, e => this.setStatus('Error sending coin; see log.'))
  };
  
  transferFrom = () => {
    this.setStatus('Initiating transaction... (please wait)');

    this.tokenService.transferFrom(this.account, this.fromAddress, this.fromAmount)
      .subscribe(() =>{
        this.setStatus('Transaction complete!');
        this.refreshBalance();
      }, e => this.setStatus('Error sending coin; see log.'))
  };

  getAllowance = () => {
      this.tokenService.getAllowance(this.account, this.checkAllowanceAddress)
      .subscribe(value => {
        this.checkAllowance = value;
      }, e => {this.setStatus('Error getting allowance; see log.')})
  };

  setAllowance = () => {
    this.setStatus('Setting Allowance of ' + this.symbol +  ' ' + this.allowance + ' for ' + ' ' + this.allowanceForAddress);

    this.tokenService.setAllowance(this.account, this.allowanceForAddress, this.allowance)
      .subscribe(() =>{
        this.setStatus('Allowance Set!');
        this.refreshBalance();
        this.getAllowance();
      }, e => this.setStatus('Error setting allowance; see log.'))
  };

  setStatus = message => {
    this.status = message;
  };

}
