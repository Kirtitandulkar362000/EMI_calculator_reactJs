import React, { useState } from "react";

const EMI = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [roi, setRoi] = useState("");
  const [emi, setEmi] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [totalPayment, setTotalPayment] = useState("");

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const interestRate = parseFloat(roi) / 100 / 12;
    const loanTerm = parseFloat(loanYears) * 12;

    if (principal && interestRate && loanTerm) {
      const x = Math.pow(1 + interestRate, loanTerm);
      const monthlyEMI = (principal * interestRate * x) / (x - 1);
      setEmi(monthlyEMI.toFixed(2));

      const totalPaymentValue = monthlyEMI * loanTerm;
      const totalInterestPayable = totalPaymentValue - principal;
      setTotalInterest(totalInterestPayable.toFixed(2));

      setTotalPayment(totalPaymentValue.toFixed(2));

      const labels = [];
      const data = [];

      for (let i = 1; i <= loanTerm; i++) {
        labels.push(`Month ${i}`);
        data.push(monthlyEMI);
      }
    }
  };

  return (
    <>
      <h2>Loan Calculator</h2>
      <div className="card" id="Card">
        <div className="card-body">
          <label>Loan Amount:</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="card-body">
          <label>No of Years:</label>
          <input
            type="number"
            value={loanYears}
            onChange={(e) => setLoanYears(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="card-body">
          <label>ROI:</label>
          <input
            type="number"
            value={roi}
            onChange={(e) => setRoi(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="card-body">
          <button onClick={calculateEMI} className="btn btn-dark">
            Calculate
          </button>
        </div>
        {emi && <p>EMI: {emi} per month</p>}
        {totalInterest && <p>Total Interest Payable: {totalInterest}</p>}
        {totalPayment && <p>Total Payment: {totalPayment}</p>}
      </div>
    </>
  );
};

export default EMI;
