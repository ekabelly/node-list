import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as mockNodes from "../mocks/node-list.mock.json";
import {NodeItem, nodeTypeOrder} from "../models/node-item";

/**
 * this service is not part of the actual project, its for mimicking a backend.
 */
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  // keep the nodes as a map for easy access. this functionality mimics the backend.
  private _nodesMap = new Map<string, NodeItem>();

  set nodesMap(nodeLIst: NodeItem[]) {
    for (const nodeItem of nodeLIst) {
      this._nodesMap.set(nodeItem.id, nodeItem);
    }
  }

  constructor() {
  }

  public fetchNode(nodeId: string): Observable<NodeItem> {
    return new Observable(sub => {
      setTimeout(() => {
        const node = this._nodesMap.get(nodeId);
        if (node.hasChildren && nodeTypeOrder.findIndex(nodeType => nodeType === node.type) % 2 !== 0) {
          node.children = node.children.map(childNode => this._nodesMap.get(childNode.id));
        }
        sub.next(node);
      }, 200);
    })
  }

  public fetchRootNodes(): Observable<NodeItem[]> {
    return new Observable(sub => {
      setTimeout(async () => {
        const {rootNodes, nodeList} = mockNodes;
        this.nodesMap = nodeList as NodeItem[];
        sub.next(rootNodes as NodeItem[]);
      }, 500);
    })
  }
}
