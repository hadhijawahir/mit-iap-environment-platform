import React, { useState, useEffect } from "react";
import Loading from "../../../../../utility/loading/loading";
import axios from "axios";
import ViewRequest from "./view_request/view_request";
import "./user_grid.css";

export default function SimpleTable() {
  const [rows, setRows] = useState(null);
  const [loading] = useState(null);

  useEffect(() => {
    axios
      .get("http://0.0.0.0:9080/user-services/get-requests/yashod")
      .then(function(response) {
        setRows(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [loading]);

  const Test = () => {
    return (
      <div>
        <h3>Requests</h3>
        <br />
        <table className="table table-hover table-bordered custom-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Details</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.requestNumber}>
                <td>{row.requsetTitle}</td>
                <td>{row.requestDetails}</td>
                <td>{row.state}</td>
                <td>
                  <ViewRequest row={row} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="user-table">{rows == null ? <Loading /> : <Test />}</div>
  );
}
