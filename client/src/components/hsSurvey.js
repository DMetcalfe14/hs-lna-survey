import { useState, useEffect, useMemo, useRef } from "react";
import * as Survey from "survey-react";
import * as QueryString from "query-string";
import axios from "axios";

const HSSurvey = (props) => {

  var defaultThemeColors = Survey
    .StylesManager
    .ThemeColors["default"];
defaultThemeColors["$main-color"] = "#0068b2";
defaultThemeColors["$main-hover-color"] = "#00538f";
defaultThemeColors["$text-color"] = "#4a4a4a";
defaultThemeColors["$header-color"] = "#7ff07f";

defaultThemeColors["$header-background-color"] = "#4a4a4a";
defaultThemeColors["$body-container-background-color"] = "#f8f8f8";

Survey
    .StylesManager
    .applyTheme();

  const { payroll } = QueryString.parse(props.location.search);

  const [model, setModel] = useState(new Survey.Model(json));

  const [json, setJson] = useState({
    pages: []
  });

  const getRoles = async () => {
    let roles = await axios.get(`http://server:5000/managers/find/${payroll}`)
      .then(res => {
        return res.data[0].roles;
      })
      .catch((err) => {
        console.log(err);
      });
    return roles
  }

  const buildSurvey = (roles) => {
    if (roles.length > 0) {
      roles.map((role) => {
        setJson(json.pages.push({
          name: role.name,
          elements: [
            {
              type: "matrixdynamic",
              name: role._id,
              title: "Input the required training for the role: " + role.name,
              rowCount: 1,
              columns: [
                {
                  name: "course",
                  cellType: "dropdown",
                  title: "Course",
                  choices: [
                    "Working Safely at Home",
                    "Keeping Safe at Work",
                    "Staying Safe Online"
                  ],
                  hasOther: true,
                  otherText: "Other",
                  isRequired: false
                },
                {
                  name: "delivery",
                  cellType: "dropdown",
                  title: "Delivery Method",
                  choices: [
                    "eLearning",
                    "Instructor-led (internal)",
                    "Instructor-led (external)"
                  ],
                  hasOther: true,
                  otherText: "Other",
                  isRequired: false
                },
                {
                  name: "refresh",
                  cellType: "dropdown",
                  title: "Refresh Period",
                  choices: ["1 Year", "2 Years", "3 Years", "Over 3 Years"],
                  hasOther: true,
                  otherText: "Other",
                  isRequired: false
                }
              ]
            }
          ]
        }));
        return null;
      });
    }
  }

  useEffect(async () => {
    let roles = await getRoles()
    if (roles) {
      buildSurvey(roles)
      setModel(new Survey.Model(json))
    }
  }, []);


  const onComplete = (sender) => {
    let data = JSON.stringify(sender.data, null, 3);
    console.log(data);
  };

  return <Survey.Survey model={model} onComplete={onComplete} />;

}

export default HSSurvey;
