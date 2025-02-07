import { Avatar, Table, TableBody, TableRow, Paper } from "@mui/material";
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
import AgentDialog from "./AgentDialogBox/AgentDialog";

export interface Agent {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  availability: Availability[];
  timezone: string;
}
interface Availability {
  day: string;
  from: string;
  to: string;
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);

  const handleOpenDialog = () => {
    setEditingAgent(null);
    setIsDialogOpen(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setIsDialogOpen(true);
  };

  const handleSaveAgent = (newAgent: Omit<Agent, "id">) => {
    const agentWithId = {
      ...newAgent,
      id: editingAgent ? editingAgent.id : agents.length + 1,
    };

    if (editingAgent) {
      setAgents(
        agents.map((agent) =>
          agent.id === editingAgent.id
            ? { ...editingAgent, ...newAgent }
            : agent
        )
      );
    } else {
      setAgents([...agents, agentWithId]);
    }

    setIsDialogOpen(false);
  };

  const handleDeleteAgent = (id: number) => {
    if (typeof id === "number") {
      setAgents(agents.filter((agent) => agent.id !== id));
    }
  };
  console.log(
    agents.map((agent) => agent.availability.map((slot) => slot.day)),
    "agents"
  );

  return (
    <AgentsContainer>
      <AgentHeader>
        <SectionTitle>Agents</SectionTitle>
        <AgentDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveAgent}
          agent={editingAgent}
        />
        <CreateAgent onClick={handleOpenDialog}>Add Agent</CreateAgent>
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
                {agents.length > 0 ? (
                  agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <StyledTableCell sx={{ textAlign: "center" }}>
                        {agent.id}
                      </StyledTableCell>
                      <StyledTableCell>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            cursor: "pointer",
                          }}
                        >
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
                        {agent.availability.map((slot, index) => (
                          <div key={index}>
                            {slot?.day} from {slot?.from} to {slot?.to}
                          </div>
                        ))}
                      </StyledTableCell>
                      <StyledTableCell>
                        <CustomEditIconButton
                          onClick={() => handleEditAgent(agent)}
                        >
                          <Edit />
                        </CustomEditIconButton>
                        <CustomDeleteIconButton
                          onClick={() => handleDeleteAgent(agent.id)}
                        >
                          <Delete />
                        </CustomDeleteIconButton>
                      </StyledTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan={6} sx={{ textAlign: "center" }}>
                      No agents found
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Paper>
      </AgentTable>
    </AgentsContainer>
  );
}
