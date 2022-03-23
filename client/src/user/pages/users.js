import React, { useEffect, useState } from "react";
import UserList from "../components/userList";
import LoadingSpinner from "../../shared/components/UIelements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_SERVER_URL}users`
        );

        // console.log(responseData.allUsers, responseData.user);
        setLoadedUser(responseData.allUsers);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedUser && <UserList items={loadedUser} />}
    </div>
  );
};
export default Users;
