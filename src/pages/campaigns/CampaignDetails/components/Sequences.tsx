import React, { useEffect } from "react";
import {
  SequencesContainer,
  SequencesCard,
  SequencesHeader,
} from "./Sequences.styled";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import { DataTable } from "../../../../components/common";
import { getSequenceAnalytics } from "../../../../store/slices/campaignSlice";
import type { AppDispatch } from "../../../../store";
import { SectionHeaderTitle } from "../../../../styles/GlobalStyles";

interface SequencesProps {
  campaignId: string;
}

export const Sequences: React.FC<SequencesProps> = ({
  campaignId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sequenceAnalytics, isLoadingSequenceAnalytics, errorSequenceAnalytics } = useSelector((state: RootState) => state.campaign);
  const columns = [
    { key: "emailType", label: "Email" },
    { key: "sent", label: "Sent" },
    { key: "opened", label: "Opened" },
    { key: "clicked", label: "Clicked" },
    { key: "replied", label: "Replied" },
    { key: "bounced", label: "Bounced" },
    { key: "unsubscribed", label: "Unsubscribed" },
  ];

  useEffect(() => {
    if (sequenceAnalytics?.length === 0 && !errorSequenceAnalytics) {
      dispatch(getSequenceAnalytics(campaignId));
    }
  }, [campaignId]);

  return (
    <SequencesContainer>
      <SequencesCard>
        <SequencesHeader>
          <SectionHeaderTitle>Sequences</SectionHeaderTitle>
        </SequencesHeader>

        <DataTable
          columns={columns}
          searchable={false}
          showHeader={false}
          data={sequenceAnalytics as unknown as Record<string, unknown>[]}
          loading={isLoadingSequenceAnalytics}
        />
      </SequencesCard>
    </SequencesContainer>
  );
};

export default Sequences;
