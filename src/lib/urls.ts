export function getBlogBaseUrl() {
  const { hostname, protocol } = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1")
    return `${protocol}//blog.localhost:${window.location.port}`;
  return `${protocol}//${hostname.startsWith("www.") ? "www.blog." + hostname.slice(4) : "blog." + hostname}`;
}
export function getPortfolioUrl() {
  const { hostname, protocol, port } = window.location;
  if (hostname.endsWith("localhost")) return `${protocol}//localhost:${port}`;
  return `${protocol}//${hostname.replace("www.blog.", "www.").replace(/^blog\./, "")}`;
}
export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
