/**
 *
 * API DOC
 *
 * This is an api documentation to a data tree describing a structure of a database.
 * This api should be split into a few microservices, including an api map and an auth service.
 * Each entity in the database structure should have its own microservice, responsible for writing
 * and reading from the database, serving information for the client and updating the node service.
 * To serve the actual node tree, there should be a node-tree microservice containing each node.
 * This db should be non-relational db to allow better performance of querying specific nodes by id.
 * Each node document should contain its parent id, and children's ids or the children's document (duplicate data).
 * This will allow, for example, for the root nodes to e directly served with its children.
 * When served in this way, its children should contain children id's and will be fetched when clicking
 * on a second layer node. The node fetched (on click) should contain its child documents.
 * In short, each time a node is fetched, it is fetched with a second layer to improve performance.
 * Given more time, I would probably write the mocks in a way that each node fetched should be fetched with
 * 2 more layers to better improve performance.
 *
 *
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
 * @returns token         {JWT}
 * @returns userId        {string}
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
 * @returns nodeId        {string}
 * @returns children      {Node[] | nodeId[]}
 * @returns allowedUsers  {UserId[]}
 * @returns type          {NodeType: string}
 * @returns isRoot        {boolean}
 *
 */
