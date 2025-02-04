import {
  Avatar,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableRow,
  Paper,
} from "@mui/material";
import {
  AgentsContainer,
  AgentHeader,
  SectionTitle,
  CreateAgent,
  StyledTableContainer,
  StyledTableHeadCell,
  AgentTable,
  StyledTableCell,
  StyledTableHead,
  CustomDeleteIconButton,
  CustomEditIconButton,
} from "./Agents.styled";
import { Edit, Delete } from "@mui/icons-material";
import { useState } from "react";

const agentsData = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/300?img=1",
    phone: "123-456-7890",
    email: "john@example.com",
    availability: "Available",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/300?img=2",
    phone: "987-654-3210",
    email: "jane@example.com",
    availability: "Not Available",
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/300?img=3",
    phone: "564-789-1234",
    email: "alice@example.com",
    availability: "Available",
  },
  {
    id: 4,
    name: "Robert Brown",
    avatar: "https://i.pravatar.cc/300?img=4",
    phone: "321-654-9870",
    email: "robert@example.com",
    availability: "Not Available",
  },
  {
    id: 5,
    name: "Emily White",
    avatar: "https://i.pravatar.cc/300?img=5",
    phone: "741-852-9630",
    email: "emily@example.com",
    availability: "Available",
  },
  {
    id: 6,
    name: "Michael Green",
    avatar: "https://i.pravatar.cc/300?img=6",
    phone: "951-753-4682",
    email: "michael@example.com",
    availability: "Not Available",
  },
  {
    id: 7,
    name: "Sarah Wilson",
    avatar: "https://i.pravatar.cc/300?img=7",
    phone: "852-456-7891",
    email: "sarah@example.com",
    availability: "Available",
  },
  {
    id: 8,
    name: "David Clark",
    avatar: "https://i.pravatar.cc/300?img=8",
    phone: "963-741-2580",
    email: "david@example.com",
    availability: "Not Available",
  },
  {
    id: 9,
    name: "Olivia Martinez",
    avatar: "https://i.pravatar.cc/300?img=9",
    phone: "753-951-8523",
    email: "olivia@example.com",
    availability: "Available",
  },
  {
    id: 10,
    name: "Daniel Harris",
    avatar: "https://i.pravatar.cc/300?img=10",
    phone: "159-357-4568",
    email: "daniel@example.com",
    availability: "Not Available",
  }
];


export default function Agents() {
  const [agents, setAgents] = useState(agentsData);

  const handleAvailabilityChange = (id: number, newAvailability: string) => {
    setAgents(
      agents.map((agent) =>
        agent.id === id ? { ...agent, availability: newAvailability } : agent
      )
    );
  };

  return (
    <AgentsContainer>
      <AgentHeader>
        <SectionTitle>Agents</SectionTitle>
        <CreateAgent>Create Agent</CreateAgent>
      </AgentHeader>
      <AgentTable>
        <Paper>
          <StyledTableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <StyledTableHeadCell>AgentID</StyledTableHeadCell>
                  <StyledTableHeadCell>Name</StyledTableHeadCell>
                  <StyledTableHeadCell>Phone</StyledTableHeadCell>
                  <StyledTableHeadCell>Email</StyledTableHeadCell>
                  <StyledTableHeadCell>Availability</StyledTableHeadCell>
                  <StyledTableHeadCell>Actions</StyledTableHeadCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <StyledTableCell sx={{textAlign: "center"}}>{agent.id}</StyledTableCell>
                    <StyledTableCell>
                      <div style={{display: "flex", alignItems: "center", gap: 8, cursor: "pointer"}}>
                      <Avatar
                        src={agent.avatar}
                        alt={agent.name}
                        style={{ marginRight: 8, width: 32, height: 32 }}
                      />
                      {agent.name}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>{agent.phone}</StyledTableCell>
                    <StyledTableCell>{agent.email}</StyledTableCell>
                    <StyledTableCell>
                      <Select
                        value={agent.availability}
                        onChange={(e) =>
                          handleAvailabilityChange(agent.id, e.target.value)
                        }
                        variant="standard"
                      >
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Not Available">Not Available</MenuItem>
                      </Select>
                    </StyledTableCell>
                    <StyledTableCell>
                      <CustomEditIconButton >
                        <Edit />
                      </CustomEditIconButton>
                      <CustomDeleteIconButton >
                        <Delete />
                      </CustomDeleteIconButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Paper>
      </AgentTable>
    </AgentsContainer>
  );
}
