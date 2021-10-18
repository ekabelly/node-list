import { UserId } from "./User";

export enum NodeTypes {
  DB_CONN = 'DB_CONN',
  DB = 'DB',
  SCHEMA = 'SCHEMA',
  TABLE = 'TABLE',
  COLUMN = 'COLUMN'
}

export interface NodeItem {
  id: string;
  name: string;
  hasChildren: boolean;
  allowedUsers: UserId[];
  children?: NodeItem[] | string[];
  type: NodeTypes;
  isRoot: boolean;
}
