import { jwtDecode } from "jwt-decode";
// import "core-js/stable/atob";
// import { decode } from "base-64";
// global.atob = decode;


export const UserProfileComponent=()=>{
    
const t=localStorage.getItem('token')
console.log(t)
// const d=jwtDecode(t)
// console.log(d)

    return <>
        <table>
            <tbody>
                <tr>
                    <td>email:</td>
                    <td>gg</td>
                </tr>
            </tbody>
        </table>
    </>
}