import { Injectable } from '@angular/core';
import { CIDString, Filelike, Web3File, Web3Response, Web3Storage } from 'web3.storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  client: Web3Storage = new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBGNTIyMzJkYzZhNWYyODhhMkNlNkU1YTZGNjRiOTZiQjAwM2FDQ2MiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDMzNjI3NTA0MzYsIm5hbWUiOiJ3ZWIzLXRva2VuIn0.15sgfNlpCqPXIOMHcw3zHSueybCBkzsVvcD4chD_N8I',
  });

  constructor() {}

  async sendFileToStorage(filePath: Iterable<Filelike>): Promise<string> {
    return this.client
      .put(filePath)
      .then((cid: CIDString) => cid)
      .catch((error: string) => error);
  }

  async getFileFromStorage(cid: string): Promise<Web3Response | null> {
    const response = await this.client.get(cid);
    if (!response) {
      return null;
    } else {
      return response;
    }
  }

  async calltest(cid: string): Promise<Web3File[]> {
    const res = await this.client.get(cid);
    const files = await res?.files()!;
    return files;
  }
}
