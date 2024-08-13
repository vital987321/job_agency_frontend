/**
 * Exepts URLSearchParams of a current client URL and 
 * based on it generates a QueryString to be used 
 * for server request to get list of items. 
 * @param {URLSearchParams} searchParams 
 * @param {Number} listItemsLimit - amount of items to be requested from DB
 * @returns QueryString to be used for server request
 */

/*TODO: offset parameter is not needed anymowre. Remove it*/


export const generateRequestQueryString = (
  searchParams,
  listItemsLimit
) => {
  const requestSearchParams=new URLSearchParams(searchParams)
  if (!requestSearchParams.has("limit")){
    requestSearchParams.set("limit", listItemsLimit)
  }
  if (!requestSearchParams.has("offset")){
    requestSearchParams.set("offset", '0')
  }
  return requestSearchParams.toString()
};