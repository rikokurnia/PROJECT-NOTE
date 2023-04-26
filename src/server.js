const Hapi = require("@hapi/hapi"); //acces library
const routes = require("./routes");

const init = async () => {      //running server
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {           //cors > allow acces to origin for acces something data   (ALL DATA)
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);   //call data from routes

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
