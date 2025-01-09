export const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === "true";

export async function fetchRequest<T>(
  url: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, unknown> | string;
    headers?: Record<string, string>;
    next?: {
      revalidate?: number | false;
      tags?: string[];
    };
    cache?: RequestCache;
  },
) {
  try {
    const startTime = performance.now();

    const defaultOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchOptions = {
      ...defaultOptions,
      ...options,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    };

    const response = await fetch(url, fetchOptions);
    const endTime = performance.now();

    console.log(
      `✨ ${fetchOptions.method} ${url} - ${response.status} ${response.statusText}`,
    );
    console.log(`⏱️ Request took ${(endTime - startTime).toFixed(2)}ms`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`❌ Error fetching ${url}:`, error);
    throw error;
  }
}
