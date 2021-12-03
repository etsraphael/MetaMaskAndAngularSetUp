import { Component, OnInit } from '@angular/core';
import Web3 from 'web3'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-tour-of-heroes';

  ngOnInit(): void {

    console.log(Web3)

    // if (typeof window.ethereum !== 'undefined') {
    //   console.log(window.ethereum)
    //   console.log('MetaMask is installed!');
    // }

    // let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    // console.log(web3);
  }
}
