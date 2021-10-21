import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NodeItem, nodeTypeOrder} from "../models/node-item";
import {BackendService} from "./backend.service";
import {first} from "rxjs/operators";
import * as t from "../mocks/node-list.mock.json";

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
    return this.backendService.fetchNode(nodeId).pipe(first()).toPromise();
  }

  public async fetchRootNodes(): Promise<NodeItem[]> {
    return this.backendService.fetchRootNodes().pipe(first()).toPromise();
  }
}
