import React, { useState } from "react";
import { Redirect } from "react-router";
import UserDetail from "./UserDetail";
import EmployeeDetail from "./EmployeeDetail";

function Account({ logout, accountData, setAccountData, getEmployees }) {
  const AccountInfo = () => {
    return (
      <div>
        <p>Welcome back {accountData.Username}!</p>

        <button type="button" onClick={logout}>
          Logout
        </button>

        <button type="button" onClick={getEmployees}>
          Verify
        </button>
      </div>
    );
  };

  return (
    <div>
      {!accountData ? (
        <Redirect to="/login"></Redirect>
      ) : (
        <AccountInfo></AccountInfo>
      )}
    </div>
  );
}

export default Account;
