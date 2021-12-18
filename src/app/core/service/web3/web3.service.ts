import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  constructor() { }


  checkIfWeb3IsInstalled(): Web3 {
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      // Use web3 provider
      return new Web3(window.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');
      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      return new Web3(new Web3.providers.HttpProvider(Web3.givenProvider));
    }
  }


  
}
