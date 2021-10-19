import {Component, OnInit} from '@angular/core';
import {NodesService} from "./services/nodes.service";
import {Observable} from "rxjs";
import {NodeItem} from "./models/node-item";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private nodesService: NodesService, public userService: UserService) {
  }

  public rootNodes$: Observable<NodeItem[]>;

  ngOnInit() {
    this.rootNodes$ = this.nodesService.fetchParentNodes();
  }
}
