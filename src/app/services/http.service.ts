import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {nodes} from "../mocks/nodes";
import {NodeItem} from "../models/node-item";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _nodeList$ = new BehaviorSubject<Map<string, NodeItem>>(new Map());

  set nodeList(nodeList: NodeItem[]) {
    this._nodeList$.next(new Map(nodeList.map(nodeItem => [nodeItem.id, nodeItem])))
  }

  get nodeListMap(): Map<string, NodeItem> {
    return this._nodeList$.getValue();
  }

  get nodeLIst$(): Observable<Map<string, NodeItem>> {
    return this._nodeList$.asObservable();
  }

  public fetchNode(nodeId: string): Observable<NodeItem> {
    return new Observable(sub => {
      setTimeout(() => {
        sub.next(this.nodeListMap.get(nodeId));
      }, 500);
    })
  }

  public fetchRootNodes(): Observable<NodeItem[]> {
    return new Observable(sub => {
      setTimeout(() => {
        const nodeList = nodes;
        this.nodeList = nodeList;
        sub.next(nodeList.filter(node => node.isRoot))
      }, 500);
    })
  }
}
