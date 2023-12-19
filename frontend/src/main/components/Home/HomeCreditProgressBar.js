import ProgressBar from 'react-bootstrap/ProgressBar';

function CreditProgressBar({ creditProgressBar: { availableCredit, initialCredit } }) {
    const now = availableCredit / initialCredit * 100;
  return <ProgressBar now={now} label={`\$${availableCredit}`} />;
}

export default CreditProgressBar;