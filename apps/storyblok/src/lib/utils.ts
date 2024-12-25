export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === "true";

export async function fetcher(slug: string, params: Record<string, any>) {
  const now = performance.now();
  const response = await fetch(slug, params);
  const end = performance.now();

  console.log("fetcher execution time: ", (end - now).toFixed(2));

  console.log(response.status, response.statusText);

  return await response.json();
}
