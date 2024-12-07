import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const AssignmentList = ({ courseId }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/assignments/${courseId}`);
        setAssignments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="assignment table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>File Name</TableCell>
            <TableCell>Submission Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.id}</TableCell>
                <TableCell>{assignment.studentName}</TableCell>
                <TableCell>{assignment.fileName}</TableCell>
                <TableCell>{new Date(assignment.submissionDate).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No assignments submitted for this course.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AssignmentList;
