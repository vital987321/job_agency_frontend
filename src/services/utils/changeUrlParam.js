/**
 * 
 * @param {string} url 
 * @param {string} paramKey 
 * @param {string} paramValue 
 * @returns {string} udpated url
 * 
 * function replace (or adds if not exists) a value for specified QueryParameter in a given URL. 
 */

export const changeUrlParam=(url, paramKey, paramValue)=>{
    url=new URL(url)
    const origin=url.origin
    const pathname=url.pathname
    const params=new URLSearchParams(url.search)

    params.set(paramKey, paramValue)
    const newUrl= new URL(`${origin}${pathname}?${params.toString()}`)
    return newUrl.toString()
}