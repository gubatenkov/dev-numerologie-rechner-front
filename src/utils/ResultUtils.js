export function shouldShowDuplicatedComparisonResult(numberId) {
  const notToShow = [
    "LZ",
    "WZ",
    "GZ",
    "TZ",
    "BfZ",
    "GDR",
    "GDR-V",
    "GDR-F",
    "GDR-I",
    "VZ-B",
    "VZ-P",
    "VZ-E",
    "HF",
    "HF1",
    "HF2",
    "HF3",
    "HF4",
    "HP",
    "HP1",
    "HP2",
    "HP3",
    "HP4",
    "PJ",
    "PJNJ"
  ];

  return notToShow.findIndex(id => id === numberId) === -1;
}
