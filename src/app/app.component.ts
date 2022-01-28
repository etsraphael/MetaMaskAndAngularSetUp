import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { Web3Service } from './core/service/web3/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  web3: Web3 = null!;
  accountConnected: string = null!;

  constructor(private web3Service: Web3Service) {}

  ngOnInit(): void {
    this.web3 = this.web3Service.checkIfWeb3IsInstalled();
    this.getAccount();
    this.listener();
    // console.log(this.web3.eth)
  }

  login(): void {
    if (window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(() => {
          this.getAccount();
        })
        .catch(() => {
          console.log('requested accounts error');
        });
    }
  }

  getAccount(): void {
    this.web3.eth.getAccounts().then(
      (response: string[]) => {
        this.accountConnected = response[0];
      },
      () => {
        console.log('get accounts error');
      }
    );

    // const web3 = new Web3(provider);
    this.web3.eth.getBalance('0xB790F2178D35f244D9EecF1130496309eAE063be', (err: any, balance: any) => {
      console.log('boum : ')
      console.log(balance);
    });
  }

  logout(): void {
    this.accountConnected = null!;
  }

  listener() {
    window.ethereum.on('accountsChanged', async () => {
      // Do something
      alert('accounts changed');
    });
  }
}
