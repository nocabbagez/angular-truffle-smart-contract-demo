import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

const tokenArtifacts = require('../../build/contracts/Token.json');
const contract = require('truffle-contract');

@Injectable()
export class TokenService {
	Token = contract(tokenArtifacts);
  // tokenContract;

  constructor(private web3Ser: Web3Service) {
    this.init();
  }

  init() {
    this.Token.setProvider(this.web3Ser.web3.currentProvider);
    // this.Token.deployed().then(instance => this.tokenContract = instance)
  }

  getBalance(account): Observable<number> {
  	return Observable.create(observer => {
  		this.Token
  		  .deployed()
  		  .then(instance => {
  		    return instance.getBalance.call(account, {
  		      from: account
  		    });
  		  })
  		  .then(value => {
  		    observer.next(value)
  		    observer.complete()
  		  })
  		  .catch(e => {
  		    console.log(e);
  		    observer.error(e)
  		  });
  	})
  }

  getName(): Observable<string> {
  	return Observable.create(observer => {
  		this.Token
  		  .deployed()
  		  .then(instance => {
  		    return instance.name();
  		  })
  		  .then(value => {
  		    observer.next(value)
  		    observer.complete()
  		  })
  		  .catch(e => {
  		    console.log(e);
  		    observer.error(e)
  		  });
  	})
  }

  getSymbol(): Observable<string> {
  	return Observable.create(observer => {
  		this.Token
  		  .deployed()
  		  .then(instance => {
  		    return instance.symbol();
  		  })
  		  .then(value => {
  		    observer.next(value)
  		    observer.complete()
  		  })
  		  .catch(e => {
  		    console.log(e);
  		    observer.error(e)
  		  });
  	})
  }

  transfer(from, to, amount): Observable<any>{
  	return Observable.create(observer => {
  	  this.Token
  	    .deployed()
  	    .then(instance => {
  	      return instance.transfer(to, amount, {
  	        from: from
  	      });
  	    })
  	    .then(() => {
  	      observer.next()
  	      observer.complete()
  	    })
  	    .catch(e => {
  	    	console.log(e);
  	      observer.error(e)
  	    });
  	})
  }

  transferFrom(to, from, amount): Observable<any>{
  	return Observable.create(observer => {
  	  this.Token
  	    .deployed()
  	    .then(instance => {
  	      return instance.transferFrom(from, to, amount, {
  	        from: to
  	      });
  	    })
  	    .then(() => {
  	      observer.next()
  	      observer.complete()
  	    })
  	    .catch(e => {
  	    	console.log(e);
  	      observer.error(e)
  	    });
  	})
  }

  getAllowance(account, forAccount): Observable<number> {
      return Observable.create(observer => {
        this.Token
          .deployed()
          .then(instance => {
            return instance.getAllowance.call(forAccount, {
              from: account
            });
          })
          .then(value => {
            observer.next(value)
            observer.complete()
          })
          .catch(e => {
            console.log(e);
            observer.error(e)
          });
      })
    }

    setAllowance(from, to, amount): Observable<any>{
      return Observable.create(observer => {
        this.Token
          .deployed()
          .then(instance => {
            return instance.approve(to, amount, {
              from: from
            });
          })
          .then(() => {
            observer.next()
            observer.complete()
          })
          .catch(e => {
            console.log(e);
            observer.error(e)
          });
      })
    }
}
