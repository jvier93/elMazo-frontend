import "./ListOfUsers.css";
import React from "react";

export const ListOfUsers = ({ users }) => {
  return (
    <div className="listOfUsers">
      <h3>
        <i class="fas fa-user-friends"></i> Jugadores
      </h3>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="user">
            <div>
              {user.username + "  "}
              {user.admin ? <i class="fas fa-crown"></i> : ""}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
