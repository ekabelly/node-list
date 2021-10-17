import {Component, Input} from '@angular/core';
import {NodeItem} from "../../models/node-item";

@Component({
  selector: 'app-root-nodes-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.css']
})
export class NodeListComponent {
  @Input() nodes: NodeItem[] | null;
}
