import { UserId } from "./User";

export enum NodeTypes {
  DB_CONN,
  DB,
  SCHEMA,
  TABLE,
  COLUMN
}

export interface BaseNodeItem {
  id: string;
  name: string;
}

export interface NodeItem extends BaseNodeItem{
  allowedUsers: UserId[];
  children?: BaseNodeItem[]
  type: NodeTypes;
  isRoot: boolean;
}
