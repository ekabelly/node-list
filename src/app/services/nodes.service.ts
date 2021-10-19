import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NodeItem} from "../models/node-item";
import {HttpService} from "./http.service";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  private _nodeMap$ = new BehaviorSubject<Map<string, NodeItem>>(new Map());

  get nodeMap$(): Observable<Map<string, NodeItem>> {
    return this._nodeMap$.asObservable();
  }

  constructor(private httpService: HttpService) {
  }

  setNodeMap$(nodeMap: Map<string, NodeItem>) {
    this._nodeMap$.next(nodeMap);
  }

  fetchNode(nodeId: string): Promise<NodeItem> {
    return this.httpService.fetchNode(nodeId).pipe(first()).toPromise();
  }

  fetchParentNodes(): Observable<NodeItem[]> {
    return this.httpService.fetchRootNodes();
  }
}
