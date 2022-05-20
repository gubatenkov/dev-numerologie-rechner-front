import { useTranslation } from "react-i18next";

export const usePlansData = () => {
  const { t } = useTranslation();

  const plansData = [
    {
      id: 1,
      heading: t("PLANS_TABLE_GROUP_1_TITLE_TEXT"),
      rows: [
        {
          id: 1,
          text: t("PLANS_TABLE_ROW_1_TITLE_TEXT"),
          bold: false,
          option1: true,
          option2: true,
          option3: true,
          option4: true
        },
        {
          id: 2,
          text: t("PLANS_TABLE_ROW_2_TITLE_TEXT"),
          bold: false,
          option1: true,
          option2: true,
          option3: true,
          option4: true
        },
        {
          id: 3,
          text: t("PLANS_TABLE_ROW_3_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: false,
          option3: false,
          option4: true
        },
        {
          id: 4,
          text: t("PLANS_TABLE_ROW_4_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: false,
          option3: true,
          option4: true
        },
        {
          id: 5,
          text: t("PLANS_TABLE_ROW_5_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: false,
          option3: true,
          option4: true
        },
        {
          id: 6,
          text: t("PLANS_TABLE_ROW_6_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: false,
          option3: false,
          option4: true
        },
        {
          id: 7,
          text: t("PLANS_TABLE_ROW_7_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: false,
          option3: true,
          option4: true
        },
        {
          id: 8,
          text: t("PLANS_TABLE_ROW_8_TITLE_TEXT"),
          bold: false,
          option1: true,
          option2: true,
          option3: true,
          option4: true
        },
        {
          id: 9,
          text: t("PLANS_TABLE_ROW_9_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: false,
          option3: false,
          option4: true
        },
        {
          id: 10,
          text: t("PLANS_TABLE_ROW_10_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: true,
          option3: true,
          option4: true
        },
        {
          id: 11,
          text: t("PLANS_TABLE_ROW_11_TITLE_TEXT"),
          bold: false,
          option1: true,
          option2: true,
          option3: true,
          option4: true
        },
        {
          id: 12,
          text: t("PLANS_TABLE_ROW_12_TITLE_TEXT"),
          bold: true,
          option1: false,
          option2: false,
          option3: true,
          option4: true
        },
        {
          id: 13,
          text: t("PLANS_TABLE_ROW_13_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: false,
          option3: false,
          option4: true
        },
        {
          id: 14,
          text: t("PLANS_TABLE_ROW_14_TITLE_TEXT"),
          bold: true,
          option1: false,
          option2: false,
          option3: true,
          option4: true
        },
        {
          id: 15,
          text: t("PLANS_TABLE_ROW_15_TITLE_TEXT"),
          bold: true,
          option1: false,
          option2: false,
          option3: false,
          option4: true
        }
      ]
    },
    {
      id: 2,
      heading: t("PLANS_TABLE_GROUP_2_TITLE_TEXT"),
      rows: [
        {
          id: 16,
          text: t("PLANS_TABLE_ROW_16_TITLE_TEXT"),
          bold: false,
          option1: true,
          option2: true,
          option3: true,
          option4: true
        },
        {
          id: 17,
          text: t("PLANS_TABLE_ROW_17_TITLE_TEXT"),
          bold: false,
          option1: true,
          option2: true,
          option3: true,
          option4: true
        },
        {
          id: 18,
          text: t("PLANS_TABLE_ROW_18_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: false,
          option3: false,
          option4: true
        },
        {
          id: 19,
          text: t("PLANS_TABLE_ROW_19_TITLE_TEXT"),
          bold: true,
          option1: false,
          option2: true,
          option3: true,
          option4: true
        },
        {
          id: 20,
          text: t("PLANS_TABLE_ROW_20_TITLE_TEXT"),
          bold: false,
          option1: false,
          option2: false,
          option3: false,
          option4: true
        },
        {
          id: 21,
          text: t("PLANS_TABLE_ROW_21_TITLE_TEXT"),
          bold: true,
          option1: false,
          option2: false,
          option3: true,
          option4: true
        }
      ]
    }
  ];

  return [plansData];
};
