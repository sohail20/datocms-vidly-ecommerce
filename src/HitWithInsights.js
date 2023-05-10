import { connectHitInsights } from "react-instantsearch-dom";
import PropTypes from "prop-types";
import React from "react";

function Hit({ hit, insights }) {
  console.log("hit", hit);
  return (
    <div
      onClick={() => {
        insights("clickedObjectIDsAfterSearch", {
          eventName: "Add to favorite",
          userToken: "user-1",
        });
      }}
      style={{
        cursor:"pointer"
      }}
    >
      <img
        src={hit.heroImage.imageUrl}
        align="left"
        alt={hit.heroImage.alt}
        style={{ width: 300 }}
      />
      <div className="hit-name">
        <b style={{ marginTop: 20 }}>{hit.title.en}</b>
      </div>
      <div className="hit-description">
        {hit.heroCaption.en}
      </div>
      <div className="hit-price">{hit.price}</div>
      {/* <button
                className="hit-action"
                
            >
                Send click
            </button> */}
      {/* <button
        className="hit-action"
        onClick={() => {
          insights("convertedObjectIDsAfterSearch", {
            eventName: "Add to basket",
            userToken: "user-1",
          });
        }}
      >
        Send conversion
      </button> */}
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
  insights: PropTypes.func.isRequired,
};

export const HitWithInsights = connectHitInsights(window.aa)(Hit);
