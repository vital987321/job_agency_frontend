
export const test=(searchParams)=>{
    console.log(searchParams)
    return searchParams.get("active")
}