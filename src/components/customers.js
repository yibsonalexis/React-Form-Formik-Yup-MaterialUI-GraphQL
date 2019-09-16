import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card } from "@material-ui/core";

export const GET_CUSTOMERS = gql`
  {
    Customers {
      ID
      FullName
      SecondName
      LastName
      FirstName
    }
  }
`;

export function Customers() {
  const { loading, error, data } = useQuery(GET_CUSTOMERS, {
    // pollInterval: 5000, //Call Function eache 5 seconds
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}> Error! ${error.message}`</p>;
  return (
    <div id="viewCustomers">
      <h5>LIST OF HUMANS</h5>
      {data.Customers.map((p, i) => (
        <Card
          key={i}
          style={{ padding: "10px", margin: "5px" }}
        >{`${p.FirstName}  ${p.SecondName} ${p.LastName}`}</Card>
      ))}
    </div>
  );
}
