import {Component, Input} from '@angular/core';
import {NodeItem} from "../../models/node-item";

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {

  private _node: NodeItem;

  public children: NodeItem[];

  @Input() set node(node: NodeItem) {
    if (node) {
      this._node = node;
      if (node.children && typeof node.children[0] !== 'string') {
        this.children = (node.children as NodeItem[]) || [];
      }
    }
  }

  get node(): NodeItem {
    return this._node || {};
  }
}
