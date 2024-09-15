import { Route } from "react-router-dom"
import { UserFlowRouter } from "./userFlowRouter"
import { AdminFlowRouter } from "./adminFlowRouter"

export const RouterComponent=(
        <Route>
            {UserFlowRouter}
            {AdminFlowRouter}
            <Route path="unauthorized" element={<p className="e404message">User is not authorized for this action.</p>}/>
            <Route path="*" element={<p className="e404message">Page not Found</p>}/>
        </Route>
)