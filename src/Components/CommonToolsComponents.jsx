import "../css/commonTools.css"

export const ApplicationStatusMarker = (props) => {
    if (props.status == "Rejected")
      return <span className="application-status-marker-rejected">&#11044;</span>;
    if (props.status == "Approved")
          return <span className="application-status-marker-approved">&#11044;</span>;
    return <span className="application-status-marker-pending">&#11044;</span>;
  };