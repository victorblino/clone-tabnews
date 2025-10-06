import useSWR from "swr";

async function fetchStatus(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 2000,
  });

  let updateAtText = "Carregando...";
  if (!isLoading && data) {
    console.log(data.update_at);

    updateAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }
  return "Última atualização:" + updateAtText;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchStatus, {
    refreshInterval: 2000,
  });

  console.log(data);

  let databaseStatusText = "Carregando...";
  if (!isLoading && data) {
    databaseStatusText = (
      <>
        <div>
          <p>
            Versão do Postgres: {data.dependecies.database.postgres_version}
          </p>
          <p>Máximo de conexões: {data.dependecies.database.max_connections}</p>
          <p>
            Conexões abertas na DB:{" "}
            {data.dependecies.database.opened_connections}
          </p>
        </div>
      </>
    );
  }
  return databaseStatusText;
}

// todo: página com todas as informações do /api/v1/status
export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt />
      <h2>Database:</h2>
      <DatabaseStatus />
    </>
  );
}
