import React from "react";

import "./index.scss";

import Aside from "../../Aside";
import ResultRow from "../../ResultRow";
import ResultsSection from "./components/ResultsSection";

const Results = ({
  sidebarItems,
  renderItems,
  onDownloadClick,
  isDownloadable
}) => {
  const render = (items, Comp) => {
    return items.map((group, idx) => {
      if (group.showTitle) {
        return (
          <div className="results-section__box" key={idx}>
            <h4 className="results-section__subheading">{group.name}</h4>
            {group.rows.map((row, idx) => (
              <Comp key={idx} {...row} accessLevel={group.accessLevel} />
            ))}
          </div>
        );
      }
      return group.rows.map((row, idx) => (
        <Comp key={idx} {...row} accessLevel={group.accessLevel} />
      ));
    });
  };

  return (
    <section className="results">
      <div className="container">
        <div className="results-inner">
          <div className="results-left">
            <Aside
              items={sidebarItems}
              onDownloadClick={onDownloadClick}
              isDownloadable={isDownloadable}
            />
          </div>
          <div className="results-right">
            <div className="results-wrap">
              {renderItems.map((sec, idx) => {
                return (
                  <ResultsSection heading={sec.sectionHeading} key={idx}>
                    {render(sec.groups, ResultRow)}
                  </ResultsSection>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
