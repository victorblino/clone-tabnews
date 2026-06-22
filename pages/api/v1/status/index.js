import { createRouter } from "next-connect";

import database from "infra/database.js";
import { InternalServerError, MethodNotAllowed } from "infra/errors.js";

const router = createRouter();

router.get(getHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowed();

  response
    .status(publicErrorObject.statusCode)
    .json(publicErrorObject.toJson());
}

function onErrorHandler(error, request, response) {
  const publicErrorObject = new InternalServerError({
    cause: error,
  });
  response.status(500).json(publicErrorObject);
}

async function getHandler(request, response) {
  const databaseName = process.env.POSTGRES_DB;
  const updateAt = new Date().toISOString();
  const databaseVersion = await database.query("SHOW server_version;");
  const maxConections = await database.query("SHOW max_connections;");
  const openedConnections = await database.query({
    text: "SELECT count(*)::int from pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  response.status(200).json({
    update_at: updateAt,
    dependecies: {
      database: {
        postgres_version: databaseVersion.rows[0].server_version,
        max_connections: parseInt(maxConections.rows[0].max_connections),
        opened_connections: parseInt(openedConnections.rows[0].count),
      },
    },
  });
}
