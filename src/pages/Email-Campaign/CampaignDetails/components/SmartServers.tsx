import React from "react";
import { Typography } from "@mui/material";
import { Server, Settings, Zap } from "lucide-react";
import {
  SmartServersContainer,
  SmartServersCard,
  SmartServersHeader,
  SmartServersTitle,
  ServersList,
  ServerCard,
  ServerInfo,
  ServerIcon,
  ServerDetails,
  ServerName,
  ServerDescription,
  ServerStatus,
  StatusIndicator,
  ConfigButton,
  EmptyState,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
} from "./SmartServers.styled";

interface SmartServer {
  id: string;
  name: string;
  description: string;
  active: boolean;
  stats?: {
    emailsSent: number;
    successRate: number;
  };
}

interface SmartServersProps {
  servers?: SmartServer[];
  onConfigure?: (server: SmartServer) => void;
}

const SmartServers: React.FC<SmartServersProps> = ({
  servers = [],
  onConfigure,
}) => {
  const totalEmailsSent = servers.reduce(
    (acc, server) => acc + (server.stats?.emailsSent || 0),
    0
  );
  const averageSuccessRate =
    servers.length > 0
      ? servers.reduce((acc, server) => acc + (server.stats?.successRate || 0), 0) /
        servers.length
      : 0;

  return (
    <SmartServersContainer>
      <SmartServersCard>
        <SmartServersHeader>
          <SmartServersTitle>Smart Servers</SmartServersTitle>
        </SmartServersHeader>

        {servers.length > 0 ? (
          <>
            <StatsGrid>
              <StatCard>
                <StatValue>{servers.length}</StatValue>
                <StatLabel>Total Servers</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{servers.filter((s) => s.active).length}</StatValue>
                <StatLabel>Active Servers</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{totalEmailsSent.toLocaleString()}</StatValue>
                <StatLabel>Emails Sent</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{averageSuccessRate.toFixed(1)}%</StatValue>
                <StatLabel>Success Rate</StatLabel>
              </StatCard>
            </StatsGrid>

            <ServersList style={{ marginTop: 24 }}>
              {servers.map((server) => (
                <ServerCard key={server.id}>
                  <ServerInfo>
                    <ServerIcon active={server.active}>
                      <Server size={24} />
                    </ServerIcon>
                    <ServerDetails>
                      <ServerName>{server.name}</ServerName>
                      <ServerDescription>{server.description}</ServerDescription>
                    </ServerDetails>
                  </ServerInfo>
                  <ServerStatus>
                    <StatusIndicator active={server.active}>
                      {server.active ? "Active" : "Inactive"}
                    </StatusIndicator>
                    <ConfigButton onClick={() => onConfigure?.(server)}>
                      <Settings size={16} />
                      Configure
                    </ConfigButton>
                  </ServerStatus>
                </ServerCard>
              ))}
            </ServersList>
          </>
        ) : (
          <EmptyState>
            <Zap size={48} />
            <Typography variant="h6">No smart servers configured</Typography>
            <Typography color="textSecondary">
              Configure smart servers to optimize your email delivery
            </Typography>
          </EmptyState>
        )}
      </SmartServersCard>
    </SmartServersContainer>
  );
};

export default SmartServers;

