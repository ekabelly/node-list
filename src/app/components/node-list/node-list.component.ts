import {Component, Input} from '@angular/core';
import {NodeItem} from "../../models/node-item";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-root-nodes-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss']
})
export class NodeListComponent {
  @Input() nodes: NodeItem[] | null;

  constructor(public userService: UserService) {
  }
}
