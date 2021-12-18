import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-tour-of-heroes';
  web3: Web3 | any;

  constructor() {
    this.checkIfWeb3IsInstalled();
  }

  ngOnInit(): void {
    this.getAccount();
    this.login();
  }

  login(): void {
    // console.log('my value : ');
    // console.log(this.web3.ethereum.isMetaMask);


    if(window.ethereum.isMetaMask) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((response: any) => {
        console.log(response);
        console.log('requested accounts');
      })
      .catch(() => {console.log('requested accounts error')});
    }
  }

  getAccount(): void {
    // this.web3.eth.getAccounts().then(console.log);
  }

  checkIfWeb3IsInstalled(): void {
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      // Use web3 provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');
      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider(Web3.givenProvider));
    }
  }
}
