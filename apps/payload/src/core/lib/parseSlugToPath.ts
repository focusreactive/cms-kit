type SlugParam = string[]

export function parseSlugToPath(pathSegments: SlugParam) {
  const decodedSegments = pathSegments?.map(segment => decodeURIComponent(segment)) || []
  const fullPath = decodedSegments.join('/')
  const url = '/' + fullPath

  return {
    decodedSegments,
    url,
  }
}
