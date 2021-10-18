import {NodeItem, NodeTypes} from "../models/node-item";

export const nodes: NodeItem[] = [
  {
    id: '1',
    name: 'first db conn',
    type: NodeTypes.DB_CONN,
    children: [{name: 'db1', id: 'db1'}, {name: 'db7', id: 'db7'}],
    isRoot: true,
    allowedUsers: ['1', '2', '6']
  }
]


/**
 * auth service
 *
 * post api/auth
 *
 * body:
 *
 * @param username      {string}
 * @param password      {string}
 *
 * response:
 *
 * @param token         {JWT}
 * @param userId        {string}
 *
 *
 * nodes service
 *
 * get api/node/:id
 *
 * query param:
 *
 * @param root          {boolean}
 *
 * response:
 *
 * @param nodeId        {string}
 * @param children      {BaseNodeItem[]}
 * @param allowedUsers  {UserId[]}
 * @param type          {NodeType: string}
 * @param isRoot        {boolean}
 *
 */
