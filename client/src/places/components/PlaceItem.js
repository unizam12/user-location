import React, { useContext } from "react";
import "./PlaceItem.css";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIelements/LoadingSpinner";

const PlaceItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}places/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <li className="place-item">
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="place-item__image">
        <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
      </div>
      <div className="place-item__info">
        <h2>{props.title}</h2>
        <h3>{props.address}</h3>
        <p>{props.description}</p>
      </div>
      <div className="place-item__actions">
        <Button>View on map</Button>
        {auth.userId === props.creatorId && (
          <Button to={`/places/${props.id}`}>Edit</Button>
        )}
        {auth.userId === props.creatorId && (
          <Button onClick={confirmDeleteHandler}>Delete</Button>
        )}
      </div>
    </li>
  );
};
export default PlaceItem;
