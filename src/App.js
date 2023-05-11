import algoliasearch from "algoliasearch/lite";
import React, { Component } from "react";
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
import { HitWithInsights } from "./HitWithInsights";

const searchClient = algoliasearch(
  "QHYLAXTG31",
  "babc39e7f16ddece7fd1a1848312ff0e"
);

class App extends Component {
  render() {
    return (
      <div className="ais-InstantSearch">
        <h1>Shopping</h1>
        <InstantSearch indexName="dev_test" searchClient={searchClient}>
          <div className="left-panel">
            <ClearRefinements />
            <h2>Post Types</h2>
            <RefinementList attribute="postType.en" />
            <Configure hitsPerPage={2} clickAnalytics  />
          </div>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={HitWithInsights} />
            <Pagination />
          </div>
        </InstantSearch>
      </div>
    );
  }
}

export default App;
