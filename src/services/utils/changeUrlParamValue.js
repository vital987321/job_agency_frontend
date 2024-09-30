/**
 * function replace (or adds if does not exists) a value for specified QueryParameter in a given URL.
 * If paramValue=Null then rerurns url string without paramKey  
 * @param {string} url 
 * @param {string} paramKey 
 * @param {string} paramValue 
 * @returns {string} udpated url
 */

export const changeUrlParamValue=(url, paramKey, paramValue)=>{

    url=new URL(url)
    const origin=url.origin
    const pathname=url.pathname
    const params=new URLSearchParams(url.search)
    if (paramValue==null) {
        params.delete(paramKey)
    }
    else {
        params.set(paramKey, paramValue)
    }
        
    const parmsString=params.toString()? (`?${params.toString()}`) : ''
    const newUrl= new URL(`${origin}${pathname}${parmsString}`)
    return newUrl.toString()
}