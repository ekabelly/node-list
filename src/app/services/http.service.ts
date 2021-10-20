import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {nodeTypeOrder} from "../mocks/nodes";
import {NodeItem} from "../models/node-item";
import * as t from '../mocks/node-list.mock.json';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _nodeMap$ = new BehaviorSubject<Map<string, NodeItem>>(new Map());

  set nodeMap(nodeList: NodeItem[]) {
    this._nodeMap$.next(new Map(nodeList.map(nodeItem => [nodeItem.id, nodeItem])))
  }

  get nodeMapGetter(): Map<string, NodeItem> {
    return this._nodeMap$.getValue();
  }

  get nodeLIst$(): Observable<Map<string, NodeItem>> {
    return this._nodeMap$.asObservable();
  }

  public fetchNode(nodeId: string): Observable<NodeItem> {
    return new Observable(sub => {
      setTimeout(() => {
        const node = this.nodeMapGetter.get(nodeId);
        if (node.hasChildren && nodeTypeOrder.findIndex(nodeType => nodeType === node.type) % 2 !== 0) {
          node.children = node.children.map(childNode => this.nodeMapGetter.get(childNode.id));
        }
        sub.next(node);
      }, 200);
    })
  }

  public fetchRootNodes(): Observable<NodeItem[]> {
    return new Observable(sub => {
      setTimeout(async () => {
        // @ts-ignore
        const {rootNodes, nodeList} = t;
        this.nodeMap = nodeList as NodeItem[];
        sub.next((rootNodes as NodeItem[]).filter(node => node.isRoot))
      }, 500);
    })
  }
}
