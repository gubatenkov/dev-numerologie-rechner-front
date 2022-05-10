import React from "react";

import "./index.scss";

import TSection from "./components/TSection";
import { plansData as sections } from "../../../utils/plansData";

const Plans = () => {
  const renderSections = sections => {
    return sections.map(row => {
      return <TSection key={row.id} {...row} />;
    });
  };

  return (
    <section className="plans">
      <div className="container">
        <div className="plans-inner">
          <h1 className="plans-title">Personality analysis</h1>
          <div className="plans-table__wrap">
            <table className="plans-table">
              <thead className="plans-table__head">
                <tr className="plans-table__head-row">
                  <td className="plans-table__head-col">Content</td>
                  <td className="plans-table__head-col">Guest User</td>
                  <td className="plans-table__head-col">Registered user</td>
                  <td className="plans-table__head-col">Short Version</td>
                  <td className="plans-table__head-col">Long Version</td>
                </tr>
              </thead>
            </table>
            {renderSections(sections)}
          </div>
        </div>
        <div className="plans-actions">
          <div className="plans-actions__inner">
            <a
              className="plans-actions__btn plans-actions__btn--outlined"
              href="https://www.bios-shop.eu/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Short Version
            </a>
            <a
              className="plans-actions__btn"
              href="https://www.bios-shop.eu/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Long Version
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
