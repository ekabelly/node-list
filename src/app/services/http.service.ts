import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {nodes} from "../mocks/nodes";
import {NodeItem} from "../models/node-item";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public fetchNode(nodeId: string): Observable<NodeItem> {
    return new Observable(sub => {
      setTimeout(() => {
        sub.next(nodes.find(node => node.id === nodeId))
      }, 500);
    })
  }

  public fetchRootNodes(): Observable<NodeItem[]> {
    return new Observable(sub => {
      setTimeout(() => {
        const nodeList = nodes;
        console.log(nodeList);
        sub.next(nodeList.filter(node => node.isRoot))
      }, 500);
    })
  }
}
