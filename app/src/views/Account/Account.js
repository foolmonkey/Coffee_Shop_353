import React, { useState } from "react";
import { Redirect } from "react-router";

function Account({ logout, accountData, setAccountData }) {
  const AccountInfo = () => {
    return (
      <div>
        <p>Welcome back {accountData.Username}!</p>

        <button type="button" onClick={logout}>
          Logout
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
