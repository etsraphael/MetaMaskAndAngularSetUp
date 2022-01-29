import { Injectable } from '@angular/core';
import { Filelike, Web3Response, Web3Storage } from 'web3.storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  client: Web3Storage = new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBGNTIyMzJkYzZhNWYyODhhMkNlNkU1YTZGNjRiOTZiQjAwM2FDQ2MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDMzNjI3NTA0MzYsIm5hbWUiOiJ3ZWIzLXRva2VuIn0.15sgfNlpCqPXIOMHcw3zHSueybCBkzsVvcD4chD_N8I',
  });

  constructor() {}

  async sendFileToStorage(filePath: Iterable<Filelike>): Promise<any> {
    return this.client
      .put(filePath)
      .then((cid) => {
        console.log('stored files with cid:', cid);
      })
      .catch((error) => {
        console.log('error');

        console.log(error);
      });
  }

  async getFileFromStorage(cid: string): Promise<Web3Response | null> {
    // const response: Web3Response | null = await this.client.get(cid);

    // if (!response) {
    //   return null;
    // } else {
    //   return response;
    // }

    const response = await this.client.get(cid);
    if (!response) {
      return null;
    } else {
      return response;
    }
  }

  async calltest(cid: string) {
    // You can fetch data using any CID, even from IPFS Nodes or Gateway URLs!
    const res = await this.client.get(cid);
    const files = await res?.files()!;

    for (const file of files) {
      // console.log(`${file.cid}: ${file.name} (${file.size} bytes)`);

      console.log(file)

      // console.log(`https://${file.cid}.ipfs.dweb.link/${file.name}`)
      // console.log("https://bafybeia6ejf27xb5g5bg5tog6vurm3rrlx3jnxmrnbatfygh342zrfvzmm.ipfs.dweb.link/photo-1643376093837-e34aa74a231b.jpeg")
    }
  }
}
