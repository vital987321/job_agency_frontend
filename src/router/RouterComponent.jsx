import { Route } from "react-router-dom"
import { UserAreaRouter } from "./UserAreaRouter"
// import { AdminRouterComponent } from "./AdminRouterComponent"

export const RouterComponent=(
        <Route>
            {UserAreaRouter}
            {/* {AdminRouterComponent} */}
            <Route path="*" element={<p>Page not Found</p>}/>
        </Route>
)