import data from "./components/data.json";

function getData(id) {
  var county_data = data.features.filter(
    (elem) => elem.properties.GEO_ID === id
  )[0];
  return county_data.properties;
}

const initialState = {
  data: {
    GEO_ID: "0500000US00000",
    STATE: "00",
    COUNTY: "000",
    NAME: "US Total",
    LSAD: "CA",
    CENSUSAREA: 0,
    pct_uninsured: 0.1,
    finance_data: {
      "Below FPL": 0.33,
      "100-138% FPL": 0.1,
      "139-249% FPL": 0.1,
      "250-400% FPL": 0.17,
      "Above 400% FPL": 0.14,
      Unknown: 0.0,
    },
    age_data: {
      "Under 18": 0.15,
      "19-34": 0.38,
      "35-49": 0.26,
      "50-64": 0.2,
      Unknown: 0.01,
    },
    race_data: {
      "Spanish/Hispanic/Latino": 0.29,
      White: 0.47,
      Black: 0.16,
      "Asian/Pacific Islander": 0.04,
      "Native American": 0.02,
      "Multi-racial or Other": 0.03,
      Unknown: 0,
    },
    social_data: {
      "% Male": 0.56,
      "% Female": 0.44,
      "% Married": 0.27,
      "% Child in Family": 0.37,
      "% Full-time Worker in Family": 0.79,
      "% SNAP Recipient": 0.16,
      "% With Disability": 0.09,
    },
    education_data: {
      "% Less than High School": 0.18,
      "% High School Diploma": 0.67,
      "% College Grad": 0.15,
      Unknown: 0,
    },
  },
};

export default function chartReducer(state = initialState, action) {
  switch (action.type) {
    case "newCounty": {
      return {
          data: getData(action.payload)
        };
    }
    default:
      return state;
  }
}
