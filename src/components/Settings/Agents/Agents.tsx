import React, { useEffect, useState } from "react";
import { Avatar, Table, TableBody, TableRow } from "@mui/material";
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
import AgentDialog from "./AgentDialogBox/AgentDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { Agent, fetchAgents } from "../../../redux/slice/agentsSlice";
import Loader from "../../../components/Loader";
import toast, {Toaster} from "react-hot-toast";
import { Button } from "../../../styles/global.styled";

const Agents: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.user);
  const {data} = useSelector((state: RootState) => state.agents);

  useEffect(() => {
    if(data){
      setAgents(data);
    }
  }, [data]);
  useEffect(() => {
    // setLoading(true);
    if (user) {
      dispatch(fetchAgents(user.orgId))
        .unwrap()
        .then(() => {
          // setLoading(false);
          toast.success("Agents fetched successfully");
        })
        .catch((error) => {
          console.error("Failed to fetch agents:", error);
          toast.error("Failed to fetch agents");
        });
    }
  }, [dispatch, user]);

  const handleOpenDialog = () => {
    setEditingAgent(null);
    setIsDialogOpen(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setIsDialogOpen(true);
  };

  const handleSaveAgent = (newAgent: Omit<Agent, "id">) => {
    const agentWithId: Agent = {
      ...newAgent,
      id: editingAgent ? editingAgent.id : (agents.length + 1).toString(),
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

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

  return (
    <AgentsContainer>
      {loading && <Loader />}
      <AgentHeader>
        <SectionTitle>Agents</SectionTitle>
        <AgentDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveAgent}
          agent={editingAgent}
        />
        <Button onClick={handleOpenDialog}>Add User</Button>
      </AgentHeader>
      <AgentTable>
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
            <TableBody style={{ background: 'var(--background-light)f'}}>
              {agents.length > 0 ? (
                agents.map((agent, index) => (
                  <TableRow key={agent.id}>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {index + 1}
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
                    <StyledTableCell>
                      {agent.phone || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>{agent.email}</StyledTableCell>
                    <StyledTableCell>
                      {agent.schedule && agent.schedule.schedule.length > 0 ? (
                        agent.schedule.schedule.map((slot, idx) => {
                          const start = slot.hours?.[0]?.startTime || slot.startTime;
                          const end = slot.hours?.[0]?.endTime || slot.endTime;
                          return (
                            <div key={idx}>
                              {slot.day} from {start} to {end}
                            </div>
                          );
                        })  
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
      </AgentTable>
      <Toaster />
    </AgentsContainer>
  );
};

export default Agents;
