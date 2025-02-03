import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import './OfficerDashboards.css';

const OfficerDashboard = () => {
  const [section, setSection] = useState('elections');

  // Mock Data
  const elections = [
    { id: 1, name: 'Presidential Election 2025', status: 'Ongoing' },
    { id: 2, name: 'Parliamentary Election 2025', status: 'Upcoming' },
    { id: 3, name: 'Local Election 2025', status: 'Completed' },
  ];

  const voters = [
    { id: 1, name: 'John Doe', status: 'Approved' },
    { id: 2, name: 'Jane Smith', status: 'Pending' },
    { id: 3, name: 'Bob Johnson', status: 'Approved' },
  ];

  const results = [
    { election: 'Presidential Election 2025', candidate: 'Alice Green', votes: 55000 },
    { election: 'Presidential Election 2025', candidate: 'John Brown', votes: 47000 },
  ];

  const securityEvents = [
    { timestamp: '2025-02-01 10:00:00', description: 'Suspicious login attempt from IP: 192.168.1.1' },
    { timestamp: '2025-02-01 14:30:00', description: 'System log: Unauthorized access to voting records' },
  ];

  const communications = [
    { id: 1, subject: 'Upcoming Election Reminder', date: '2025-02-01' },
    { id: 2, subject: 'System Maintenance Notification', date: '2025-02-02' },
  ];

  return (
    <Container className="officer-dashboard-container">
      {/* Welcome Message and Constituency Information */}
      <Box className="welcome-section">
        <Typography variant="h5" gutterBottom>
          Welcome to the Voting Officer Dashboard
        </Typography>
        <Typography variant="body1">
          Constituency: XYZ Constituency, Region 1
        </Typography>
      </Box>

      {/* Voting Statistics */}
      <Box className="statistics-section">
        <Typography variant="h6" gutterBottom>Voting Statistics</Typography>
        <Card className="statistics-card">
          <CardContent>
            <Typography variant="body1">Total Registered Voters: 150,000</Typography>
            <Typography variant="body1">Votes Cast: 45,000</Typography>
            <Typography variant="body1">Voting Progress: 30%</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Navigation Links */}
      <Box className="navigation-section">
        <Button variant="contained" onClick={() => setSection('elections')}>Election Management</Button>
        <Button variant="contained" onClick={() => setSection('voters')}>Voter Management</Button>
        <Button variant="contained" onClick={() => setSection('results')}>Results & Analytics</Button>
        <Button variant="contained" onClick={() => setSection('security')}>Security & Audit</Button>
        <Button variant="contained" onClick={() => setSection('communications')}>Communications</Button>
      </Box>

      {/* Election Management Section */}
      {section === 'elections' && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Manage Elections</Typography>
            <Button variant="outlined">View Election List</Button>
            <Button variant="outlined">Create New Election</Button>
            <Box className="card-list">
              <Typography variant="body1" mt={2}>Election List:</Typography>
              <List>
                {elections.map((election) => (
                  <ListItem key={election.id}>
                    <ListItemText
                      primary={`${election.name} - Status: ${election.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Registered Voters Section */}
      {section === 'voters' && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Manage Voters</Typography>
            <Button variant="outlined">View Voter List</Button>
            <Button variant="outlined">Approve Registrations</Button>
            <Box className="card-list">
              <Typography variant="body1" mt={2}>Voter List:</Typography>
              <List>
                {voters.map((voter) => (
                  <ListItem key={voter.id}>
                    <ListItemText
                      primary={`${voter.name} - Status: ${voter.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Results & Analytics Section */}
      {section === 'results' && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Voting Results & Analytics</Typography>
            <Button variant="outlined">View Live Results</Button>
            <Button variant="outlined">Generate Reports</Button>
            <Box className="card-list">
              <Typography variant="body1" mt={2}>Presidential Election 2025 Results:</Typography>
              <List>
                {results.map((result, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${result.candidate}: ${result.votes} votes`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Security & Audit Section */}
      {section === 'security' && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Security & Audit Logs</Typography>
            <Button variant="outlined">Monitor Suspicious Activity</Button>
            <Button variant="outlined">View System Logs</Button>
            <Box className="card-list">
              <Typography variant="body1" mt={2}>Recent Security Events:</Typography>
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
      {section === 'communications' && (
        <Card className="dashboard-section">
          <CardContent>
            <Typography variant="h6">Communication & Support</Typography>
            <Button variant="outlined">Send Announcements</Button>
            <Button variant="outlined">Manage Complaints</Button>
            <Box className="card-list">
              <Typography variant="body1" mt={2}>Recent Communications:</Typography>
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
