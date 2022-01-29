import { Injectable } from '@angular/core';
import { Filelike, Web3Storage } from 'web3.storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  client: Web3Storage = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBGNTIyMzJkYzZhNWYyODhhMkNlNkU1YTZGNjRiOTZiQjAwM2FDQ2MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDMzNjI3NTA0MzYsIm5hbWUiOiJ3ZWIzLXRva2VuIn0.15sgfNlpCqPXIOMHcw3zHSueybCBkzsVvcD4chD_N8I' })

  constructor() { }

  async sendFileToStorage(filePath: Iterable<Filelike>): Promise<any> {

    return this.client.put(filePath)
    .then(cid => {
      console.log('stored files with cid:', cid)
    })
    .catch(error => {

      console.log('error')


      console.log(error)
    })

  }


}
