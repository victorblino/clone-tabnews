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
    
    updateAtText = new Date(data.update_at).toLocaleString("pt-BR")
  }
  return updateAtText;
}


// todo: página com todas as informações do /api/v1/status
export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAt/>
    </>
  );
}
