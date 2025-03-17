import React, { useState } from "react";
import AssignmentForm from "../../components/AssignmentForm/AssignmentForm";
import AssignmentList from "../../components/AssignmentList/AssignmentList";
import ErrorBoundary from "../../ErrorBoundary";

const AssignmentsPage = () => {
  // Hold the selected client state here
  const [selectedClient, setSelectedClient] = useState("");

  // This state can trigger a refresh on AssignmentList when a new assignment is created.
  const [newAssignment, setNewAssignment] = useState(null);

  const handleAssignmentCreated = (assignment) => {
    setNewAssignment(assignment);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Assignment Management</h2>

      {/* Client selection dropdown */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="clientSelect">Select Client: </label>
        <select
          id="clientSelect"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">--Select a Client--</option>
          <option value="101">Alice Smith</option>
          <option value="102">Bob Johnson</option>
          <option value="103">Charlie Brown</option>
        </select>
      </div>

      {/* Assignment form receives the selected client as a prop */}
      <ErrorBoundary>
        <AssignmentForm
          selectedClient={selectedClient}
          onAssignmentCreated={handleAssignmentCreated}
        />
      </ErrorBoundary>

      {/* Assignment list displays the assignments */}
      <AssignmentList
        key={newAssignment ? newAssignment.id : "assignmentList"}
      />
    </div>
  );
};

export default AssignmentsPage;
