import React, { useState } from "react";
import AssignmentForm from "../../components/AssignmentForm/AssignmentForm";
import AssignmentList from "../../components/AssignmentList/AssignmentList";

const AssignmentsPage = () => {
  // This state can be used to trigger a refresh on the AssignmentList when a new assignment is created
  const [newAssignment, setNewAssignment] = useState(null);

  const handleAssignmentCreated = (assignment) => {
    setNewAssignment(assignment);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Assignment Management</h2>
      <AssignmentForm onAssignmentCreated={handleAssignmentCreated} />
      <AssignmentList
        key={newAssignment ? newAssignment.id : "assignmentList"}
      />
    </div>
  );
};

export default AssignmentsPage;
