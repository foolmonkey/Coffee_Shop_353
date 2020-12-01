import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
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
        {/* <ul className="sidelinks">
          <li>
            <Link to="/account/#profile">Profile</Link>
          </li>
          <li>
            <Link to="/account/#open">Orders</Link>
          </li>
          <li>
            <Link to="/account/#open">Open</Link>
          </li>
          <li>
            <Link to="/account/#closed">Closed</Link>
          </li>
        </ul> */}

        <div className="accountContainer" id="profile">
          <h2>Welcome back {accountData.Username}!</h2>

          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>

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
