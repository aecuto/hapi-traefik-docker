"use strict";

const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 8001,
    host: "0.0.0.0",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      const query = request.query;
      return {
        msg: "Hello World! 2",
        query,
      };
    },
  });

  server.route({
    path: "/upload",
    method: "POST",
    options: {
      payload: {
        maxBytes: 1000000,
        parse: true,
        output: "stream",
        multipart: true,
      },
    },
    handler: async (req, h) => {
      const { payload } = req;

      return {
        data: payload.file.hapi.filename,
      };
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
