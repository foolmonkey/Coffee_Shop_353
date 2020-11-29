import React, { useState } from "react";
import { Redirect } from "react-router";
import UserDetail from "./UserDetail";
import EmployeeDetail from "./EmployeeDetail";

function Account({
  logout,
  accountData,
  setAccountData,
  getEmployees,
  isEmployee,
}) {
  const AccountInfo = () => {
    return (
      <div className="account">
        <p>Welcome back {accountData.Username}!</p>

        <button type="button" onClick={logout}>
          Logout
        </button>

        {isEmployee ? (
          <EmployeeDetail
            accountData={accountData}
            setAccountData={setAccountData}
            getEmployees={getEmployees}
          />
        ) : (
          <UserDetail
            accountData={accountData}
            setAccountData={setAccountData}
          />
        )}
      </div>
    );
  };

  return (
    <main>
      {!accountData ? (
        <Redirect to="/account/login"></Redirect>
      ) : (
        <AccountInfo></AccountInfo>
      )}
    </main>
  );
}

export default Account;
