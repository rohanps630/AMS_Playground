export type ValuationDataType = {
  CourseCode: string;
  CourseName: string;
  NumberOfAnswerSheet: number;
  AnswerSheetForThirdValuation: number;
};

export type ValuationColumnType = {
  Header: string;
  accessor: keyof ValuationDataType;
}

export const valuationColumn: ValuationColumnType[] = [
  {
    Header: "Course Code",
    accessor: "CourseCode",
  },
  {
    Header: "Course Name",
    accessor: "CourseName",
  },
  {
    Header: "Number Of answersheet",
    accessor: "NumberOfAnswerSheet",
  },
  {
    Header: "Answer sheet for third valuation",
    accessor: "AnswerSheetForThirdValuation",
  },
];

export const valuationData: ValuationDataType[] = [
  {
    CourseCode: "MA0U20A",
    CourseName: "Partial Differential Equations and Complex Analysis",
    NumberOfAnswerSheet: 25,
    AnswerSheetForThirdValuation: 5,
  },
  {
    CourseCode: "EE1U20A",
    CourseName: "Circuits and Network",
    NumberOfAnswerSheet: 20,
    AnswerSheetForThirdValuation: 8,
  },
  {
    CourseCode: "EEIU20B",
    CourseName: "Measurement and Instrumentation",
    NumberOfAnswerSheet: 25,
    AnswerSheetForThirdValuation: 25,
  },
  {
    CourseCode: "AEDU20I",
    CourseName: "Analog Electronics-I",
    NumberOfAnswerSheet: 18,
    AnswerSheetForThirdValuation: 3,
  },
];
