import React from "react";
import AssignmentList from "./AssignmentList";

const CourseModule = ({ selectedCourseId }) => {
  return (
    <div>
      <h1>Course Module</h1>
      <h2>Assignments</h2>
      <AssignmentList courseId={selectedCourseId} />
    </div>
  );
};

export default CourseModule;
