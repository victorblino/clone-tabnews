import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { createRouter } from "next-connect";
import { MethodNotAllowed, InternalServerError } from "infra/errors";

const router = createRouter();

router.get(getHandler).post(postHandler);

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
  const publicErrorObject = new InternalServerError({ cause: error });
  response.status(500).json(publicErrorObject.toJson());
}

async function getHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
    return response.status(200).json(pendingMigrations);
  } finally {
    dbClient.end();
  }
}

async function postHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  } finally {
    dbClient.end();
  }
}

// todo: implementar no futuro maybe, pra ficar menos código pra não repetir toda hora a conexão da DB (com callback)
// async function withDatabase(callback) {
//   const dbClient = await database.getNewClient();

//   try {
//     return await callback(dbClient);
//   } finally {
//     dbClient.end();
//   }
// }
// ou talvez colocar o defaultMigrationsOptions padrão numa função pra retornar um "padrão"
