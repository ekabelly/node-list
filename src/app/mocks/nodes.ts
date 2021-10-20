import {NodeTypes} from "../models/node-item";
// import {UserId} from "../models/User";
// import {randomNum, randomStr} from "../util/app-util";
//
// const nodesKeyVal: Record<NodeTypes, NodeItem[]> = {
//   [NodeTypes.DB_CONN]: [],
//   [NodeTypes.DB]: [],
//   [NodeTypes.SCHEMA]: [],
//   [NodeTypes.TABLE]: [],
//   [NodeTypes.COLUMN]: []
// }
//
export const nodeTypeOrder = [NodeTypes.DB_CONN, NodeTypes.DB, NodeTypes.SCHEMA, NodeTypes.TABLE, NodeTypes.COLUMN];
//
// const ids = new Map<string, boolean>();
//
//
// const fillNodeWithChildren = (nodesList: NodeItem[], nodeChildrenType: NodeTypes, nodeTypeIndex: number): NodeItem[] => {
//   return nodesList.map(node => {
//     if (node.hasChildren) {
//       const children = createStubNodes(nodeChildrenType);
//       // node.children = Number(nodeTypeIndex) % 2 === 0 ? children : children.map(childNode => childNode.id)
//       node.children = children;
//       if (nodeChildrenType === NodeTypes.COLUMN) {
//         nodesKeyVal[nodeChildrenType] = [
//           ...nodesKeyVal[nodeChildrenType],
//           ...children
//         ];
//       } else {
//         const childrenNodeType = nodeTypeOrder[nodeTypeIndex + 2];
//         nodesKeyVal[nodeChildrenType] = [
//           ...nodesKeyVal[nodeChildrenType],
//           ...fillNodeWithChildren(JSON.parse(JSON.stringify(children)), childrenNodeType, nodeTypeIndex + 1)
//         ];
//       }
//     }
//     return node;
//   });
// }
//
// const createNodeCollection = (): NodeItem[] => {
//   nodesKeyVal[nodeTypeOrder[0]] = fillNodeWithChildren(
//     createStubNodes(nodeTypeOrder[0]),
//     nodeTypeOrder[Number(0) + 1],
//     0
//   );
//   return nodesKeyVal.DB_CONN;
// }
//
// export function getAndCreateRootsNodes() {
//   const rootNodes: NodeItem[] = createNodeCollection();
//   let nodeList: NodeItem[] = [];
//   for (const nodeType of Object.keys(nodesKeyVal)) {
//     nodeList = [
//       ...nodeList,
//       ...nodesKeyVal[nodeType]
//     ]
//   }
//   return {
//     rootNodes, nodeList
//   }
// }
//
// function createStubNodes(nodeType: NodeTypes): NodeItem[] {
//   // const hasChildren = Math.random() > 0.3;
//   const res = new Array(randomNum()).fill(null).map(() => ({
//     id: randomStr(ids),
//     name: `${nodeType}_${randomStr()}`,
//     hasChildren: nodeType !== NodeTypes.COLUMN,
//     allowedUsers: ['1', ...new Array(randomNum(0, 8)).fill(null).map(() => randomNum(0, 8).toString())],
//     children: [],
//     type: nodeType,
//     isRoot: nodeType === NodeTypes.DB_CONN
//   }));
//   return res;
// }


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
