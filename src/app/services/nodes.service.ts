import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NodeItem} from "../models/node-item";
import {HttpService} from "./http.service";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  private _nodesMap$ = new BehaviorSubject<Map<string, NodeItem>>(new Map());

  // storing the nodeLIst as a map for easy access
  set nodesMap(nodeList: NodeItem[]) {
    const nodesMap = this.nodesMapGetter;
    for (const node of nodeList) {
      nodesMap.set(node.id, node);
    }
    this._nodesMap$.next(nodesMap);
  }

  get nodesMapGetter(): Map<string, NodeItem> {
    return this._nodesMap$.getValue();
  }

  constructor(private httpService: HttpService) {
  }

  public async fetchNode(nodeId: string): Promise<NodeItem> {
    const node = await this.httpService.fetchNode(nodeId);
    // add the node to the nodesMap
    this.nodesMap = [node];
    // return the node as a result of this method
    return node;
  }

  public async fetchParentNodes(): Promise<NodeItem[]> {
    const rootNodes = await this.httpService.fetchRootNodes();
    // each time root nodes (or any node) is being fetched, set it in the map
    this.nodesMap = rootNodes;
    // return the nodeLIst result as an array
    return rootNodes
  }
}
