import React from "react";

import "./index.scss";

import Aside from "../../Aside";
import ResultRow from "../../ResultRow";
import ResultsSection from "./components/ResultsSection";

const Results = ({
  sidebarItems,
  renderItems,
  downloadBtn,
  onBuyClick,
  onMoreClick
}) => {
  const render = (section, Comp) => {
    return section.groups.map((group, idx) => {
      if (group.showTitle) {
        return (
          <div className="results-section__box" key={idx}>
            <h4 className="results-section__subheading">{group.name}</h4>
            {group.rows.map((row, idx) => (
              <Comp
                key={idx}
                {...row}
                sectionName={section.sectionHeading}
                accessLevel={group.accessLevel}
                onBuyClick={onBuyClick}
                onMoreClick={onMoreClick}
              />
            ))}
          </div>
        );
      }
      return group.rows.map((row, idx) => (
        <Comp
          key={idx}
          {...row}
          sectionName={section.sectionHeading}
          accessLevel={group.accessLevel}
          onBuyClick={onBuyClick}
          onMoreClick={onMoreClick}
        />
      ));
    });
  };

  return (
    <section className="results">
      <div className="container">
        <div className="results-inner">
          <div className="results-left">
            <Aside items={sidebarItems} downloadBtn={downloadBtn} />
          </div>
          <div className="results-right">
            <div className="results-wrap">
              {renderItems.map((section, idx) => {
                return (
                  <ResultsSection
                    key={idx}
                    idx={idx + 1}
                    heading={section.sectionHeading}
                  >
                    {render(section, ResultRow)}
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
