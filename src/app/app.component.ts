import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { Web3Service } from './core/service/web3/web3.service';
import { Web3Storage, getFilesFromPath } from 'web3.storage'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  web3: Web3 = null!;
  accountConnected: string = null!;

  client: Web3Storage = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBGNTIyMzJkYzZhNWYyODhhMkNlNkU1YTZGNjRiOTZiQjAwM2FDQ2MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDMzNjI3NTA0MzYsIm5hbWUiOiJ3ZWIzLXRva2VuIn0.15sgfNlpCqPXIOMHcw3zHSueybCBkzsVvcD4chD_N8I' })


  constructor(private web3Service: Web3Service) {}

  ngOnInit(): void {
    this.web3 = this.web3Service.checkIfWeb3IsInstalled();
    this.getAccount();
    this.listener();
    // console.log(this.web3.eth)


    console.log("my client")
    console.log(this.client)
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

  // async storeFiles () {
  //   const files = await getFilesFromPath('/path/to/file')
  //   const cid = await this.client.put(files)
  //   console.log(cid)
  // }



  makeFileObjects() {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = { hello: 'world' }
    const blob = new Blob([JSON.stringify(obj)], {type : 'application/json'})
  
    const files = [
      new File(['contents-of-file-1'], 'plain-utf8.txt'),
      new File([blob], 'hello.json')
    ]
    return files
  }

  getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'
  
    // In a real app, it's better to read an access token from an 
    // environement variable or other configuration that's kept outside of 
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBGNTIyMzJkYzZhNWYyODhhMkNlNkU1YTZGNjRiOTZiQjAwM2FDQ2MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDMzNjI3NTA0MzYsIm5hbWUiOiJ3ZWIzLXRva2VuIn0.15sgfNlpCqPXIOMHcw3zHSueybCBkzsVvcD4chD_N8I"
  }

  makeStorageClient() {
    return new Web3Storage({ token: this.getAccessToken() })
  }

  // async storeFiles(files: any) {

  //   const reader = new FileReader()
  //   reader.onloadend = async _event => {

  //     const client = this.makeStorageClient()

  //     const file = new File([reader.result], 'hello.json')



  //     const cid = await client.put([reader.result], 'hello.json')
  //     // console.log(cid)



  //   }

  //   reader.readAsDataURL(files[0])

  //   // try {

  //   //   const client = this.makeStorageClient()
  //   //   const cid = await client.put(files[0])
  //   //   console.log('stored files with cid:', cid)
  //   // } catch (error) {
  //   //   console.log(error)
  //   // } 




  // }


  uploadFile(filePath: any) {
    const client = this.makeStorageClient()
    client.put(filePath)
      .then(cid => {
        console.log('stored files with cid:', cid)
      })
      .catch(error => {
        console.log(error)
      })

  }

}
