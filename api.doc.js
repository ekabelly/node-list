/**
 *
 * API DOC
 *
 * This is an api documentation to a data tree describing a structure of a database.
 * This api should be split into a few microservices, including an api gateway and an auth service.
 * Each entity in the database structure should have its own microservice, responsible for writing
 * and reading from the database, serving information for the client and updating the node service.
 * To serve the actual node tree, there should be a node-tree microservice containing each node.
 * This db should be non-relational db to allow better performance of querying specific nodes by id.
 * Each node document should contain its children's documents.
 * This means that each document will appear twice in the db, but should significantly improve performance.
 * This will allow, for example, for the root nodes to be directly served with its children.
 * When clicking on a child node, it should be fetched again, this time with its own id (and not through its prent's document).
 * The node fetched will contain its child documents. This node will also be saved in a local cache
 * to allow serving it and its children again without making another request.
 *
 *
 * nodes service
 *
 * get api/node/:id
 *
 * get a specific node and its children by id
 *
 * response:
 *
 * @returns nodeId        {string}
 * @returns children      {Node[]}
 * @returns allowedUsers  {UserId[]}
 * @returns type          {NodeType: string}
 * @returns isRoot        {boolean}
 *
 * get api/node
 *
 * get a list of nodes
 *
 * query params:
 *
 * @param isRoot        {boolean}       will return only root nodes
 *
 */
