import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

export const useProduct = uri => {
  const { data, error } = useSWR(uri, fetcher)
  return { data, error, loading: !data && !error }
}
