import React, { useEffect, useState } from "react";
import { getMembers, searchMembersByName } from "../services/api";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const fetchMembers = async () => {
    try {
      const params = {
        page: page,
        size: rowsPerPage,
      };
      const response = await getMembers(params);
      setMembers(response.content);
      setTotalCount(response.totalElements);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const fetchMembersByName = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;
    try {
      const params = {
        name: searchQuery,
        page: page,
        size: rowsPerPage,
      };

      const response = await searchMembersByName(params);
      setMembers(response.content);
      setTotalCount(response.totalElements);
    } catch (error) {
      console.error("Error searching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchQuery && searchQuery.trim() !== "") {
        console.log("searching member by name");
        fetchMembersByName();
      } else {
        fetchMembers();
      }
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Member List
      </Typography>
      <TextField
        label="Search by name..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/member/${member.id}`}
                    variant="outlined"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Button component={Link} to={`/add-member`} variant="outlined" >
        Add New Member
      </Button>
    </Box>
  );
};

export default MemberList;
