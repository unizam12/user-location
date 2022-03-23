import React from "react";
import UserItem from "./userItem";
import "./userList.css";

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <h2>No users found</h2>
      </div>
    );
  }

  return (
    <ul>
      {props.items.map((user) => (
        <UserItem
          className="users-list"
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};
export default UserList;
