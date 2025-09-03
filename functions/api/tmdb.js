export async function onRequest(context) {
  const { request, env } = context
  const incoming = new URL(request.url)
  const endpoint = incoming.searchParams.get('endpoint') || ''
  const params = new URLSearchParams(incoming.searchParams)
  params.delete('endpoint')

  const url = new URL(`https://api.themoviedb.org/3/${endpoint}`)
  for (const [k,v] of params.entries()) url.searchParams.set(k,v)

  const res = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${env.TMDB_TOKEN}`,
      'Accept': 'application/json'
    }
  })

  const data = await res.text()
  return new Response(data, {
    status: res.status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control':'s-maxage=86400'
    }
  })
}
