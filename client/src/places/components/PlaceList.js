import React from "react";
import "./PlaceList.css";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="plcae-list">
        <h2>No list found create one!!</h2>
        <Button to="/places/new">Share places</Button>
      </div>
    );
  }
  return (
    <ukl>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          // coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ukl>
  );
};
export default PlaceList;
