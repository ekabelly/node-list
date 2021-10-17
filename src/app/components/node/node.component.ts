import {Component, Input} from '@angular/core';
import {BaseNodeItem, NodeItem} from "../../models/node-item";

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent {

  private _node: NodeItem | BaseNodeItem;

  public children: (NodeItem | BaseNodeItem)[];

  @Input() set node(node: NodeItem | BaseNodeItem) {
    this._node = node;
    this.children = (node as NodeItem).children || [];
  }

  get node(): NodeItem | BaseNodeItem {
    return this._node;
  }
}
