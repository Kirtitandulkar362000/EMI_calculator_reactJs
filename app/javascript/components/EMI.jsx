import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const EMI = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [numberOfYears, setNumberOfYears] = useState(0);
  const [rateOfInterest, setRateOfInterest] = useState(0);
  const [interest, setInterest] = useState(0);
  const [principal, setPrincipal] = useState(0);
  const [monthlyEmi, setMonthlyEmi] = useState(0); // New state variable

  const calculateEmi = () => {
    const principalAmount = parseInt(loanAmount);
    const rateOfInterestPerMonth = parseFloat(rateOfInterest) / 100 / 12;
    const loanDuration = parseInt(numberOfYears) * 12;

    const emi =
      (principalAmount *
        rateOfInterestPerMonth *
        Math.pow(1 + rateOfInterestPerMonth, loanDuration)) /
      (Math.pow(1 + rateOfInterestPerMonth, loanDuration) - 1);

    const totalInterest = emi * loanDuration - principalAmount;
    setInterest(totalInterest.toFixed(2));
    setPrincipal(principalAmount.toFixed(2));
    setMonthlyEmi(emi.toFixed(2)); // Update monthly EMI
  };

  const data = {
    labels: ["Principal Amount", "Total Interest"],
    datasets: [
      {
        label: "Ratio of Principle and Interest",
        data: [principal, interest],
        backgroundColor: ["rgba(0, 123, 255, 0.2)", "rgba(0, 255, 255, 0.2)"],
        borderColor: ["rgba(0, 123, 255, 1)", "rgba(0, 255, 255, 1)"],
        hoverBackgroundColor: ["#007BFF", "#00FFFF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="container">
        <h1 className="mt-4 title border-left border-3">EMI Calculator</h1>
        <div className="row mt-4">
          <div className="col-md-4">
            <label className="form-label">Loan Amount:</label>
            <input
              type="number"
              className="form-control rounded-0"
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Number of Years:</label>
            <input
              type="number"
              className="form-control rounded-0"
              onChange={(e) => setNumberOfYears(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Rate of Interest (% per annum):
            </label>
            <input
              type="number"
              className="form-control rounded-0"
              onChange={(e) => setRateOfInterest(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <button
              className="btn btn-dark rounded-pill"
              onClick={calculateEmi}
            >
              Calculate
            </button>
          </div>
        </div>

        <div className="row mt-4" id="Row2">
          <div className="col-md-4">
            {/* <h3>EMI Calculation:</h3> */}
            <div
              className=" border-1 border-dark border-opacity-25"
              id="Border"
            >
              <h3>Monthly EMI</h3>
              <p>{monthlyEmi}</p>
            </div>
            <div
              className=" border-1 border-dark border-opacity-25"
              id="Border"
            >
              <h3>Loan Amount</h3>
              <p> {loanAmount}</p>
            </div>
            <div
              className=" border-1 border-dark border-opacity-25"
              id="Border"
            >
              <h3>Number of Years</h3>
              <p> {numberOfYears}</p>
            </div>
            <div
              className=" border-1 border-dark border-opacity-25"
              id="Border"
            >
              <h3>Rate of Interest</h3>
              <p>{rateOfInterest}%</p>
            </div>

            <div
              className=" border-1 border-dark border-opacity-25"
              id="Border"
            >
              <h3>Principal Amount</h3>
              <p>{principal}</p>
            </div>

            <div
              className=" border-1 border-dark border-opacity-25"
              id="Border"
            >
              <h3>Total Interest</h3>
              <p>{interest}</p>
            </div>
          </div>

          <div className="col-md-6">
            <h3>Pie Chart:</h3>
            <div style={{ height: "300px", width: "300px" }}>
              <Pie data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EMI;
