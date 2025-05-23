export default async function fetchResponse(
  base,
  path,
  method = "GET",
  body,
  token,
) {
  return fetch(`${base}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    credentials: "include",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error ${res.status}`),
  );
}
