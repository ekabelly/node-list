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
      if (node.children && typeof node.children[0] !== 'string') {
        this.children = (node.children as NodeItem[]) || [];
      }
    }
  }

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

  private async toggleNodeOpen() {
    const isAllowedToOpen = this.node.hasChildren &&
      !this.isOpen && !this.isLoading &&
      this.node.allowedUsers.includes(this.currentUserId);
    if (this.isOpen || isAllowedToOpen) {
      if (!this.children || this.children.length < 1) {
        this.children = (await this.fetchNodeChildren()).children as NodeItem[];
      }
      this.toggleOpen(!this.isOpen);
      this.isLoading = false;
    }
  }

  private async fetchNodeChildren(): Promise<NodeItem> {
    this.isLoading = true;
    return this.nodesService.fetchNode(this.node.id);
  }

  private toggleOpen(shouldOpen: boolean) {
    this.isOpen = shouldOpen;
    this.closeChildren = !shouldOpen;
  }
}
