import algoliasearch from "algoliasearch/lite";
import React, { useState } from "react";
import {
  ClearRefinements,
  Configure,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom";
import "./App.css";
import { connectHitInsights } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "QHYLAXTG31",
  "babc39e7f16ddece7fd1a1848312ff0e"
);

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="ais-InstantSearch">
      <InstantSearch indexName="dev_test" searchClient={searchClient}>
        <div className="left-panel">
          <ClearRefinements />
          <h2>Post Types</h2>
          <RefinementList attribute={`postType.${selectedLanguage}`} />
          <Configure hitsPerPage={2} clickAnalytics />
        </div>
        <div className="right-panel">
          <LanguageSelector handleLanguageChange={handleLanguageChange} />
          <SearchBox />
          <CustomHits selectedLanguage={selectedLanguage} />
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  );
};

const LanguageSelector = ({ handleLanguageChange }) => {
  return (
    <div className="language-selector">
      <button onClick={() => handleLanguageChange("en")}>English</button>
      <button onClick={() => handleLanguageChange("fr")}>French</button>
      {/* Add more language buttons */}
    </div>
  );
};

const CustomHits = connectHitInsights(window && window.aa)(({ hits, insights, selectedLanguage }) => {
  const HitWithInsights = connectHitInsights(window && window.aa)(({ hit }) => (
    <Hit hit={hit} insights={insights} selectedLanguage={selectedLanguage} />
  ));

  return (
    <Hits hitComponent={HitWithInsights} hits={hits} />
  );
});

const Hit = ({ hit, insights, selectedLanguage }) => {
  // Your Hit component logic here
  let userToken;
  window.aa('getUserToken', null, (_, token) => {
    userToken = token
  })

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
        {/* {heroCaption} */}
      </div>
      {/* <div className="hit-price">{hit.price}</div> */}
    </div>
  );
};

export default App;
