import {Component, Input} from '@angular/core';
import {NodeItem} from "../../models/node-item";
import {NodesService} from "../../services/nodes.service";

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
  public closeChildren = false;
  private _currentUserId: string;

  @Input() set currentUserId(currentUserId: string) {
    if (currentUserId) {
      this._currentUserId = currentUserId;
      // if node's allowed users does not include the current user, close it
      if (!this.node?.allowedUsers.includes(this.currentUserId)) {
        this.toggleOpen(false);
      }
    }
  }

  get currentUserId(): string {
    return this._currentUserId;
  }

  @Input() set node(node: NodeItem) {
    if (node) {
      this._node = node;
      // if the type of the node's children is string,
      // it will be fetched later when the user opens the node
      if (node.children && typeof node.children[0] !== 'string') {
        this.children = (node.children as NodeItem[]) || [];
      }
    }
  }

  // an input setter which enables closing this node and all the descendants
  @Input() set closeChild(closeChildren: boolean) {
    if (closeChildren) {
      this.closeChildren = true;
      this.toggleOpen(false);
    }
  }

  get node(): NodeItem {
    return this._node;
  }

  constructor(private nodesService: NodesService) {
  }

  get isAllowedToOpen(): boolean {
    // node is allowed to open if it has children
    return this.node.hasChildren &&
      // is not open, is not loading
      !this.isOpen && !this.isLoading &&
      // and if node's allowed users includes the current user
      this.node.allowedUsers.includes(this.currentUserId);
  }

  private async toggleNodeOpen() {
    if (this.isOpen || this.isAllowedToOpen) {
      // if the node is allowed to open (was checked in line 71),
      // check if the children list exist or does not have length.
      if (!this.children || this.children.length < 1) {
        this.isLoading = true;
        // fetch the children and their children (2 layers)
        this.children = (await this.fetchNodeChildren()).children as NodeItem[];
      }
      // "finally", toggle the node and set is loading to false
      this.toggleOpen(!this.isOpen);
      this.isLoading = false;
    }
  }

  private async fetchNodeChildren(): Promise<NodeItem> {
    return this.nodesService.fetchNode(this.node.id);
  }

  private toggleOpen(shouldOpen: boolean) {
    this.isOpen = shouldOpen;
    // if node is being closed
    if (!shouldOpen) {
      // close its descendants
      this.closeChildren = true;
    }
  }
}
