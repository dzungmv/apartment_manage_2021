const Post = require("./Post");

function route(app) {
  app.use("/Post", Post);
}
module.exports = route;
