import { connectHitInsights } from "react-instantsearch-dom";
import PropTypes from "prop-types";
import React from "react";

function Hit({ hit, insights }) {
  // console.log("hit", hit);
  let userToken;

  window.aa('getUserToken', null, (_, token) => {
    userToken = token
  })

  // window.dataLayer.push({
  //   algoliaUserToken: userToken,
  // });

  return (
    <div
      onClick={() => {
        insights("clickedObjectIDsAfterSearch", {
          eventName: hit.objectID,
          userToken: userToken,
        });
      }}
      data-insights-object-id={`"${hit.objectID}"`}
      data-insights-position={`"${hit.__position}"`}
      data-insights-query-id={`"${hit.__queryID}"`}
      data-insights-filter={`${hit.objectID}`}
      style={{
        cursor: "pointer"
      }}
      class="btn-view-detail"
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
      {/* <div className="hit-price">{hit.price}</div> */}
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
  insights: PropTypes.func.isRequired,
};

export const HitWithInsights = connectHitInsights(window && window.aa)(Hit);
