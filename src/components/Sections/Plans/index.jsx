import React from "react";
import { useTranslation } from "react-i18next";

import "./index.scss";

import TSection from "./components/TSection";
import { usePlansData } from "../../../utils/usePlansData";

const Plans = () => {
  const { t } = useTranslation();
  const [sections] = usePlansData();

  const renderSections = sections => {
    return sections.map(row => {
      return <TSection key={row.id} {...row} />;
    });
  };

  return (
    <section className="plans">
      <div className="container">
        <div className="plans-inner">
          <h1 className="plans-title">{t("PLANS_TITLE_TEXT")}</h1>
          <div className="plans-table__wrap">
            <table className="plans-table">
              <thead className="plans-table__head">
                <tr className="plans-table__head-row">
                  <td className="plans-table__head-col">
                    {t("PLANS_TABLE_HEADING_1_TEXT")}
                  </td>
                  <td className="plans-table__head-col">
                    {t("PLANS_TABLE_HEADING_2_TEXT")}
                  </td>
                  <td className="plans-table__head-col">
                    {t("PLANS_TABLE_HEADING_3_TEXT")}
                  </td>
                  <td className="plans-table__head-col">
                    {t("PLANS_TABLE_HEADING_4_TEXT")}
                  </td>
                  <td className="plans-table__head-col">
                    {t("PLANS_TABLE_HEADING_5_TEXT")}
                  </td>
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
              {t("PLANS_TABLE_BTN_1_TEXT")}
            </a>
            <a
              className="plans-actions__btn"
              href="https://www.bios-shop.eu/"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("PLANS_TABLE_BTN_2_TEXT")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
