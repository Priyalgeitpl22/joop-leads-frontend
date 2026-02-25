export const getStoppedReasonLabel = (stoppedReason: string) => {
  switch (stoppedReason) {
    case 'NO_ELIGIBLE_SENDERS':
      return 'Reason: No eligible senders';
    case 'TRIAL_EXPIRED':
      return 'Reason: Trial period expired';
    case 'NO_SENDERS':
      return 'Reason: No senders';
    case 'NO_SEQUENCES':
      return 'Reason: No sequences';
    case 'NO_LEADS':
      return 'Reason: No leads';
    case 'NO_EMAILS':
      return 'Reason: No emails';
    case 'NO_EMAILS_SENT':
      return 'Reason: No emails sent';
    default:
      return stoppedReason;
  }
};

export const getLeadStatusLabel = (status: string) => {
  switch (status) {
    case 'sent':
      return 'Sent';
    case 'failed':
      return 'Failed';
    case 'bounced':
      return 'Bounced';
    case 'unsubscribed':
      return 'Unsubscribed';
    case 'queued':
      return 'Queued';
    case 'replied':
      return 'Replied';
    case 'opened':
      return 'Opened';
    case 'clicked':
      return 'Clicked';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
};

export const getCampaignStatusLabel = (status: string) => {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'scheduled':
      return 'Scheduled';
  }
};