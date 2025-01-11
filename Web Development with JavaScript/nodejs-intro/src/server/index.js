const { startServer } = require('./startServer');
const server = startServer();
server.listen(3000, () => {
  console.log('Server started and listening on port 3000');
});