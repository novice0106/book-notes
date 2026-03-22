import useFetch from "./useFetch";

export default function Fetch({ uri, renderSuccess }) {
  const { loading, data, error } = useFetch(uri);

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <p>loading...</p>;
  if (data) return renderSuccess({ data });
}
