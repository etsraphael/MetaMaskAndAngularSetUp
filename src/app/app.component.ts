import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { Web3Service } from './core/service/web3/web3.service';
import { Web3Storage, getFilesFromPath, Web3Response, Web3File } from 'web3.storage'
import { StorageService } from './core/service/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  myLinkToShow: string = null!;

  constructor(
    private web3Service: Web3Service,
    private storageService: StorageService
  ) {}

  ngOnInit(): void { }


  uploadFile(filePath: any): void {
    this.storageService.sendFileToStorage(filePath).then(
      (response: string) => {
        // this.myLinkToShow = `https://${response}.ipfs.dweb.link`;

        this.storageService.calltest(response).then(
          (response: Web3File[] | null) => {
            if (!response) {
              console.log('failed ' + response);
              return null!;
            } else {
              console.log('success ');
              console.log(response)
    
    
              this.myLinkToShow = `https://${response[0].cid}.ipfs.dweb.link`;
              return null!
            }
          }
        )


      }
    )
  }


  uploadFileWithProgress(files: any): void {
    this.storageService.sendFileToStorageWithProgress(files)
  }

  async getFileFromCid(cid: string): Promise<string> {
    return this.storageService.getFileFromStorage(cid).then(
      (response: Web3Response | null) => {
        if (!response) {
          console.log('failed ' + response);
          return null!;
        } else {
          console.log('success ');
          console.log(response)
          return null!
        }
      }
    )
  }

}
