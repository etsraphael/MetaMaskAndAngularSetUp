import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { Web3Service } from './core/service/web3/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-tour-of-heroes';
  web3: Web3|any;

  constructor(
    private web3Service: Web3Service,
  ) {}

  ngOnInit(): void {
    this.web3 = this.web3Service.checkIfWeb3IsInstalled();
    this.getAccount();
  }

  login(): void {
    if (window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          console.log('requested accounts successful');
          this.getAccount()
        })
        .catch(() => {
          console.log('requested accounts error');
        });
    }
  }

  getAccount(): void {
    this.web3.eth.getAccounts().then(console.log);
  }

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
