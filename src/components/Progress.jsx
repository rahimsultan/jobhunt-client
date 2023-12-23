import React from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';

function JobStatus({ status }) {
  const getStatusIndex = (status) => {
    switch (status) {
      case 'accept':
        return 0;
      case 'reject':
        return 2;
      default:
        return 1;
    }
  };

  const currentStep = getStatusIndex(status);

  return (
    <div>
      <h2>Job Status</h2>
      <ProgressBar percent={currentStep * 50} filledBackground="linear-gradient(to right, #FE6B8B, #FF8E53)" height={20}>
        <Step transition="scale" position="first" isCompleted={currentStep > 0}>
          Accept
        </Step>
        <Step transition="scale" isCompleted={currentStep > 1}>
          In Progress
        </Step>
        <Step transition="scale" position="last">
          Reject
        </Step>
      </ProgressBar>
      <div className="text-center mt-3">
        {currentStep === 0 && <p>Job is Accepted</p>}
        {currentStep === 1 && <p>Job is In Progress</p>}
        {currentStep === 2 && <p>Job is Rejected</p>}
      </div>
    </div>
  );
}

export default JobStatus;
