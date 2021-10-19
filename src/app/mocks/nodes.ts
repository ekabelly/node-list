import {NodeItem, NodeTypes} from "../models/node-item";
import {UserId} from "../models/User";
import {randomNum, randomStr} from "../util/app-util";
import dbConnNodeList from './db-conn.mock';

const nodeItemToChild = (nodeItem: NodeItem) => ({
  ...nodeItem,
  children: nodeItem.children.map(child => (child as NodeItem).id)
})

const schemaNodeItems: NodeItem[] = [
  {
    id: '1333',
    name: 'first schema',
    type: NodeTypes.SCHEMA,
    children: [],
    isRoot: false,
    allowedUsers: ['1'],
    hasChildren: true
  }, {
    id: '1332',
    name: 'second schema',
    type: NodeTypes.SCHEMA,
    children: [],
    isRoot: false,
    allowedUsers: ['1'],
    hasChildren: true
  }
]

const dbNodeItems: NodeItem[] = [
  {
    id: '111',
    name: 'first db',
    type: NodeTypes.DB,
    children: [
      schemaNodeItems[0]
    ],
    isRoot: false,
    allowedUsers: ['1', '2', '6'],
    hasChildren: true
  },
  {
    id: '12',
    name: 'second db',
    type: NodeTypes.DB,
    children: [
      schemaNodeItems[1]
    ],
    isRoot: false,
    allowedUsers: ['1', '2', '6'],
    hasChildren: true
  }, {
    id: '11',
    name: 'first db',
    type: NodeTypes.DB,
    children: [],
    isRoot: false,
    allowedUsers: ['3'],
    hasChildren: true
  }, {
    id: '13',
    name: 'third db',
    type: NodeTypes.DB,
    children: [],
    isRoot: false,
    allowedUsers: ['6'],
    hasChildren: true
  },
]

const dbCOnnNodes: NodeItem[] = [
  {
    id: '1',
    name: 'first db conn',
    type: NodeTypes.DB_CONN,
    children: [
      nodeItemToChild(dbNodeItems[0]),
      nodeItemToChild(dbNodeItems[1]),
    ],
    isRoot: true,
    allowedUsers: ['1', '2', '6'],
    hasChildren: true
  },
  {
    id: '2',
    name: 'second db conn',
    type: NodeTypes.DB_CONN,
    children: [
      nodeItemToChild(dbNodeItems[2]),
      nodeItemToChild(dbNodeItems[3])
    ],
    isRoot: true,
    allowedUsers: ['1', '6'],
    hasChildren: true
  },
  {
    id: '3',
    name: 'third db conn',
    type: NodeTypes.DB_CONN,
    children: [],
    isRoot: true,
    allowedUsers: ['1', '6'],
    hasChildren: true
  }
];

export const nodes: NodeItem[] = [
  ...dbCOnnNodes,
  ...dbConnNodeList as NodeItem[],
  ...dbNodeItems,
  ...schemaNodeItems
]

function createStubNodes(nodeType: NodeTypes): NodeItem[] {
  const ids = new Map<string, boolean>();
  const hasChildren = Math.random() > 0.5;
  const res = new Array(randomNum()).fill(null).map(() => ({
    id: randomStr(ids),
    name: randomStr(),
    hasChildren,
    allowedUsers: [],
    children: [],
    type: nodeType,
    isRoot: nodeType === NodeTypes.DB_CONN
  }));
  return res;
}


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
 * @param children      {Node[] | nodeId[]}
 * @param allowedUsers  {UserId[]}
 * @param type          {NodeType: string}
 * @param isRoot        {boolean}
 *
 */
