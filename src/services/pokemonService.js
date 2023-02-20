import http from './httpService'

export function getPokemon(url) {
  return http.get(url);
}
