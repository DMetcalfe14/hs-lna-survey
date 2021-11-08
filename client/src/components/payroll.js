import * as Survey from "survey-react";
import "survey-react/survey.css";
import axios from "axios";

const Payroll = (props) => {

  let json = {
    pages: [
      {
        name: "manager",
        elements: [
          {
            name: "payroll",
            type: "text",
            title: "Please enter your payroll no:",
            placeHolder: "0000000",
            isRequired: true
          }
        ]
      }
    ]
  };

  const model = new Survey.Model(json);

  const payrollValid = (survey, options) => {
    
    const payroll = options.data["payroll"];

    // if question is empty do nothing
    if (!payroll) {
      options.complete();
      return;
    }

    if (payroll.length < 7) {
      options.errors["payroll"] = "A valid payroll no. is made up of 7 numbers";
      options.complete();
      return;
    }

    // if not empty then check validity against database
    axios.get(`http://server:5000/managers/find/${payroll}`)
            .then(res => {

              // if valid allow submission and redirect, else return validation message
              if (res.data.length > 0) {
                window.location = "/training?payroll=" + payroll;
                options.complete();
              } else {
                options.errors["payroll"] = "Please enter a valid payroll no.";
                options.complete();
                return;
              }

            })
            .catch((err) => {
                console.log(err);
            });

  };

  const onComplete = (sender) => {};

  model.onServerValidateQuestions.add(payrollValid);

  return <Survey.Survey model={model} onComplete={onComplete} showCompletedPage={false} />;
};

export default Payroll;
