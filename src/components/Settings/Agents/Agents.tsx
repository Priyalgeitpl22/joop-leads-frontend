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
import { useEffect, useState } from "react";
import AgentDialog from "./AgentDialogBox/AgentDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
// Import Agent type from your Redux slice to ensure consistency
import { Agent, fetchAgents } from "../../../redux/slice/agentsSlice";

export default function Agents() {
  const dispatch = useDispatch<AppDispatch>();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchAndSetAgents = async () => {
      const resultAction = await dispatch(fetchAgents(user!.orgId));
      // Check if the action is fulfilled before updating local state
      if (fetchAgents.fulfilled.match(resultAction)) {
        setAgents(resultAction.payload.data || []);
      } else {
        console.error("Failed to fetch agents:", resultAction.payload);
      }
    };
    fetchAndSetAgents();
  }, [dispatch, user?.orgId]);

  console.log("agents", agents);

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
      id: editingAgent ? editingAgent.id : agents.length + 1 + "",
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

  const handleDeleteAgent = (id: number | string) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

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
                  <StyledTableHeadCell>S.No.</StyledTableHeadCell>
                  <StyledTableHeadCell>Name</StyledTableHeadCell>
                  <StyledTableHeadCell>Phone</StyledTableHeadCell>
                  <StyledTableHeadCell>Email</StyledTableHeadCell>
                  <StyledTableHeadCell>Availability</StyledTableHeadCell>
                  <StyledTableHeadCell>Actions</StyledTableHeadCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {agents.length > 0 ? (
                  agents.map((agent,index) => (
                    <TableRow key={agent.id}>
                      <StyledTableCell sx={{ textAlign: "center" }}>
                        {index+1}
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
                            src={agent.profilePicture || ""}
                            alt={agent.fullName}
                            style={{ marginRight: 8, width: 32, height: 32 }}
                          />
                          {agent.fullName}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>{agent.phone || 'N/A'}</StyledTableCell>
                      <StyledTableCell>{agent.email}</StyledTableCell>
                      <StyledTableCell>
                        {agent.availability && agent.availability.length > 0 ? (
                          agent.availability.map((slot, index) => (
                            <div key={index}>
                              {slot.day} from {slot.from} to {slot.to}
                            </div>
                          ))
                        ) : (
                          <div>offline</div>
                        )}
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
