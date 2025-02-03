import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OfficerDashboards.css";

const OfficerDashboard = () => {
  const [section, setSection] = useState("elections");
  const [officerId, setOfficerId] = useState(null);
  const [officerName, setOfficerName] = useState("");
  const [totalVoters, setTotalVoters] = useState(0);
  const [votesCast, setVotesCast] = useState(0);
  const [votersList, setVotersList] = useState([]);
  const [showVoterList, setShowVoterList] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);

  const [openCreateElectionModal, setOpenCreateElectionModal] = useState(false);
  const [newElectionTitle, setNewElectionTitle] = useState("");
  const [newElectionStartDate, setNewElectionStartDate] = useState("");
  const [newElectionEndDate, setNewElectionEndDate] = useState("");
  const [newElectionDescription, setNewElectionDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedOfficerDetails = localStorage.getItem("officerDetails");

    if (storedOfficerDetails) {
      try {
        const parsedDetails = JSON.parse(storedOfficerDetails);
        setOfficerId(parsedDetails.officerId); // Get officerId from localStorage
        setOfficerName(parsedDetails.name); // Get officer name from localStorage
      } catch (error) {
        console.error("Error parsing officerDetails:", error);
        navigate("/"); // Redirect to login if there's an error
      }
    } else {
      navigate("/"); // If no officer details in localStorage, redirect to login
    }
  }, [navigate]);

  useEffect(() => {
    const fetchVoterData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/vote/voters`
        );
        const voters = response.data;

        // Count total voters
        const totalRegistered = voters.length;

        // Count votes cast
        const votesCasted = voters.filter((voter) => voter.hasVoted).length;

        setTotalVoters(totalRegistered);
        setVotesCast(votesCasted);
        setVotersList(voters);
      } catch (error) {
        console.error("Error fetching voter data:", error);
      }
    };

    fetchVoterData();
  }, []);

  const votesNotCast = totalVoters - votesCast;
  const votingProgress = totalVoters
    ? ((votesCast / totalVoters) * 100).toFixed(2)
    : 0;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/candidates`
        );
        setCandidates(response.data); // Assuming API returns an array of candidates
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/poll/getPoll`
        );
        const electionsData = response.data;

        const updatedElections = electionsData.map((election) => {
          const currentDate = new Date();
          const endDate = new Date(election.endDate);
          let status = "Upcoming";

          if (currentDate > endDate) {
            status = "Completed";
          } else if (currentDate < endDate) {
            status = "Ongoing";
          }

          return { ...election, status };
        });

        setElections(updatedElections);
      } catch (error) {
        console.error("Error fetching election data:", error);
      }
    };

    fetchElections();
  }, []);

  const createElection = async () => {
    try {
      const response = await axios.post(
        "${process.env.REACT_APP_API_URL}/api/poll/createPoll",
        {
          title: newElectionTitle,
          description: newElectionDescription,
          startDate: newElectionStartDate,
          endDate: newElectionEndDate,
        }
      );
      alert("Election Created Successfully!");
      setOpenCreateElectionModal(false);
      setNewElectionTitle("");
      setNewElectionDescription("");
      setNewElectionStartDate("");
      setNewElectionEndDate("");
      // fetchElections();
    } catch (error) {
      console.error("Error creating election:", error);
      alert("Failed to create election!");
    }
  };

  const securityEvents = [
    {
      timestamp: "2025-02-01 10:00:00",
      description: "Suspicious login attempt from IP: 192.168.1.1",
    },
    {
      timestamp: "2025-02-01 14:30:00",
      description: "System log: Unauthorized access to voting records",
    },
  ];

  const communications = [
    { id: 1, subject: "Upcoming Election Reminder", date: "2025-02-01" },
    { id: 2, subject: "System Maintenance Notification", date: "2025-02-02" },
  ];

  return (
    <Container className="officer-dashboard-container">
      {/* Welcome Message and Constituency Information */}
      <Box className="welcome-section">
        <Typography variant="h5" gutterBottom>
          Welcome, {officerName ? officerName : "Loading..."}!
        </Typography>
        <Typography variant="body1">
          Officer ID: {officerId ? officerId : "Loading..."}
        </Typography>
        <Typography variant="body1">
          Constituency: XYZ Constituency, Region 1
        </Typography>
      </Box>

      {/* Voting Statistics */}
      <Box className="statistics-section">
        <Typography variant="h6" gutterBottom>
          Voting Statistics
        </Typography>
        <Card className="statistics-card">
          <CardContent>
            <Typography variant="body1">
              Total Registered Voters: {totalVoters}
            </Typography>
            <Typography variant="body1">Votes Cast: {votesCast}</Typography>
            <Typography variant="body1">
              Voting Progress: {votingProgress}%
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Navigation Links */}
      <Box className="navigation-section">
        <Button variant="contained" onClick={() => setSection("elections")}>
          Election Management
        </Button>
        <Button variant="contained" onClick={() => setSection("voters")}>
          Voter Management
        </Button>
        <Button variant="contained" onClick={() => setSection("results")}>
          Results & Analytics
        </Button>
        <Button variant="contained" onClick={() => setSection("security")}>
          Security & Audit
        </Button>
        <Button
          variant="contained"
          onClick={() => setSection("communications")}
        >
          Communications
        </Button>
      </Box>

      {/* Election Management Section */}
      {section === "elections" && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Manage Elections</Typography>
            {/* Create Election Button */}
            <Button
              variant="outlined"
              onClick={() => setOpenCreateElectionModal(true)}
            >
              Create New Election
            </Button>
            {openCreateElectionModal && (
              <Box className="create-election-modal">
                <Typography variant="h6">Create New Election</Typography>
                <TextField
                  label="Election Title"
                  variant="outlined"
                  fullWidth
                  value={newElectionTitle}
                  onChange={(e) => setNewElectionTitle(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={newElectionDescription}
                  onChange={(e) => setNewElectionDescription(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label=""
                  variant="outlined"
                  fullWidth
                  type="datetime-local"
                  value={newElectionStartDate}
                  onChange={(e) => setNewElectionStartDate(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label=""
                  variant="outlined"
                  fullWidth
                  type="datetime-local"
                  value={newElectionEndDate}
                  onChange={(e) => setNewElectionEndDate(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" onClick={createElection}>
                  Create Election
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpenCreateElectionModal(false)}
                >
                  Cancel
                </Button>
              </Box>
            )}
            <Box className="card-list">
              <Typography variant="body1" mt={2}>
                Election List:
              </Typography>
              <List>
                {elections.length > 0 ? (
                  elections.map((election) => (
                    <ListItem key={election._id}>
                      <ListItemText
                        primary={`${election.title} - Status: ${election.status}`}
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No elections found." />
                  </ListItem>
                )}
              </List>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Voter Management Section */}
      {section === "voters" && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Manage Voters</Typography>
            <Button
              variant="outlined"
              onClick={() => setShowVoterList(!showVoterList)}
            >
              {showVoterList ? "Hide Voter List" : "View Voter List"}
            </Button>
            <Box className="card-list">
              <Typography variant="body1" mt={2}>
                Voter Statistics:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`Total Registered Voters: ${totalVoters}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Voters Who Have Voted: ${votesCast}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Voters Who Have Not Voted: ${votesNotCast}`}
                  />
                </ListItem>
              </List>
            </Box>

            {showVoterList && (
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Aadhar Number</TableCell>
                      <TableCell>Voter ID</TableCell>
                      <TableCell>Registered Mobile Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {votersList.map((voter) => (
                      <TableRow key={voter._id}>
                        <TableCell>{voter.name}</TableCell>
                        <TableCell>{voter.aadhar}</TableCell>
                        <TableCell>{voter.voterId}</TableCell>
                        <TableCell>{voter.mobile}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      )}

      {/* Results & Analytics Section */}
      {section === "results" && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Voting Results & Analytics</Typography>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Candidate Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Party</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Votes</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                      <TableRow key={candidate._id}>
                        <TableCell>{candidate.name}</TableCell>
                        <TableCell>{candidate.partyName}</TableCell>
                        <TableCell>{candidate.votes}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No results available yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Security & Audit Section */}
      {section === "security" && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Security & Audit Logs</Typography>
            <Button variant="outlined">Monitor Suspicious Activity</Button>
            <Button variant="outlined">View System Logs</Button>
            <Box className="card-list">
              <Typography variant="body1" mt={2}>
                Recent Security Events:
              </Typography>
              <List>
                {securityEvents.map((event, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`[${event.timestamp}] ${event.description}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Communications Section */}
      {section === "communications" && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Communication & Support</Typography>
            <Button variant="outlined">Send Announcements</Button>
            <Button variant="outlined">Manage Complaints</Button>
            <Box className="card-list">
              <Typography variant="body1" mt={2}>
                Recent Communications:
              </Typography>
              <List>
                {communications.map((communication, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${communication.subject} - Date: ${communication.date}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <Box className="footer">
        <Typography variant="body2" color="white" align="center">
          © 2025 Voting System. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default OfficerDashboard;
