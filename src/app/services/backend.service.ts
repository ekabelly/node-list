import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {urls} from "../config/urls";
import {NodeItem} from "../models/node-item";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs/operators";

/**
 * this service is not part of the actual project, its for mimicking a backend.
 */
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) {
  }

  public fetchNode(nodeId: string): Promise<NodeItem> {
    return this.httpClient.get(`${urls.baseUrl}/${urls.nodesDB}/${nodeId}.json`).pipe(first()).toPromise() as Promise<NodeItem>;
  }

  public fetchRootNodes(): Promise<NodeItem[]> {
    return this.httpClient.get(`${urls.baseUrl}/${urls.rootNodesUrl}`).pipe(first()).toPromise() as Promise<NodeItem[]>;
  }
}
