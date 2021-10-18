import {Component, Input} from '@angular/core';
import {NodeItem} from "../../models/node-item";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {

  private _node: NodeItem;

  public children: NodeItem[];
  public isLoading = false;
  public isOpen = false;

  @Input() set node(node: NodeItem) {
    if (node) {
      this._node = node;
      console.log({node})
      if (node.children && typeof node.children[0] !== 'string') {
        this.children = (node.children as NodeItem[]) || [];
      }
    }
  }

  @Input() isAllowed: boolean | null;

  get node(): NodeItem {
    return this._node;
  }

  constructor(public userService: UserService) {
  }

  toggleNodeOpen() {
    const isAllowedToOpen = this.node.children?.length > 0 && !this.isOpen && !this.isLoading && this.isAllowed !== false && this.node.allowedUsers.includes(this.userService.lastUpdatedUser.id);
    if (this.isOpen || isAllowedToOpen) {
      this.isOpen = !this.isOpen;
    }
  }
}
