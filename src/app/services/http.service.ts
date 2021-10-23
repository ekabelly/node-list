import {Injectable} from '@angular/core';
import {NodeItem} from "../models/node-item";
import {BackendService} from "./backend.service";

/**
 * this service would have been used for http requests via httpClient, fetch, axios or any other library
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private backendService: BackendService) {
  }

  public fetchNode(nodeId: string): Promise<NodeItem> {
    return this.backendService.fetchNode(nodeId);
  }

  public async fetchRootNodes(): Promise<NodeItem[]> {
    return this.backendService.fetchRootNodes();
  }
}
