import {NodeItem, NodeTypes} from "../models/node-item";

const schemaNodeItems: NodeItem[] = [
  {
    id: '1333',
    name: 'first schema',
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
      schemaNodeItems[0]
    ],
    isRoot: false,
    allowedUsers: ['1', '2', '6'],
    hasChildren: true
  },{
    id: '11',
    name: 'first db',
    type: NodeTypes.DB,
    children: [
    ],
    isRoot: false,
    allowedUsers: ['3'],
    hasChildren: true
  },{
    id: '13',
    name: 'third db',
    type: NodeTypes.DB,
    children: [
    ],
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
      dbNodeItems[0],
      dbNodeItems[1],
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
      dbNodeItems[2],
      dbNodeItems[3],
    ],
    isRoot: true,
    allowedUsers: ['1', '6'],
    hasChildren: true
  },
  {
    id: '3',
    name: 'third db conn',
    type: NodeTypes.DB_CONN,
    children: [
    ],
    isRoot: true,
    allowedUsers: ['1', '6'],
    hasChildren: true
  }
];

export const nodes: NodeItem[] = [
  ...dbCOnnNodes,
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
 * @param children      {Node[] | nodeId[]}
 * @param allowedUsers  {UserId[]}
 * @param type          {NodeType: string}
 * @param isRoot        {boolean}
 *
 */
