export function addKeysToNodes(obj: any): any {
  // If not an object, return as is
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // If array, process each element
  if (Array.isArray(obj)) {
    return obj.map((item) => addKeysToNodes(item));
  }

  // Process object
  const result = { ...obj };

  // Add _key if object has _type
  if ("_type" in obj && !("_key" in obj)) {
    result._key = crypto.randomUUID();
  }

  // Recursively process all properties
  for (const key in result) {
    result[key] = addKeysToNodes(result[key]);
  }

  return result;
}
