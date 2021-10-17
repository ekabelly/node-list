import {Component, OnInit} from '@angular/core';
import {NodesService} from "./services/nodes.service";
import {Observable} from "rxjs";
import {NodeItem} from "./models/node-item";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private nodesService: NodesService) {
  }

  rootNodes$: Observable<NodeItem[]>;

  ngOnInit() {
    this.rootNodes$ = this.nodesService.fetchParentNodes();
  }
}
