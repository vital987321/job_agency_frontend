/**
 * Exepts URLSearchParams of a current client URL and 
 * based on it generates a QueryString to be used 
 * for server request to get list of items. 
 * @param {URLSearchParams} searchParams 
 * @param {Number} listItemsLimit - amount of items to be requested from DB
 * @param {Number} offset - number of the first item
 * @returns QueryString to be used for server request
 */

/*TODO: offset parameter is not needed anymowre. Remove it*/

export const generateRequestQueryString = (
  searchParams,
  listItemsLimit,
  offset
) => {
  let qstr = "";
  qstr += searchParams.get("limit")
    ? "limit=" + searchParams.get("limit")
    : "limit=" + listItemsLimit;
  if (isNaN(offset)) {
    qstr += searchParams.get("offset")
      ? "&offset=" + searchParams.get("offset")
      : "&offset=0";
  } else {
    qstr += "&offset=" + offset;
  }
  qstr += "&active=active";
  qstr += searchParams.get("key_search")
    ? "&key_search=" + searchParams.get("key_search")
    : "";
  qstr += searchParams.get("salary_gte")
    ? "&salary_gte=" + searchParams.get("salary_gte")
    : "";
  qstr += searchParams.get("salary_lte")
    ? "&salary_lte=" + searchParams.get("salary_lte")
    : "";
  qstr += searchParams.get("location")
    ? "&location=" + searchParams.get("location")
    : "";
  qstr += searchParams.get("residence_type")
    ? "&residence_type=" + searchParams.get("residence_type")
    : "";
  qstr += searchParams.get("active")
    ? "&active=" + searchParams.get("active")
    : "";
  return qstr;
};
