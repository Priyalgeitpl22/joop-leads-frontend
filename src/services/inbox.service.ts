import type { Account } from '../types';
import { emailApi } from './api';

export interface IMailbox {
  _id: string;
  id: string;
  name: string;
}

export interface IEmailThread {
  _id: string;
  subject: string;
  from: { name: string; address: string }[];
  to: { name: string; address: string }[];
  date: string;
  body: string;
  threadId: string;
  flags?: string[];
}

export interface IThreadMessage {
  id: string;
  threadId: string;
  messageId: string;
  from: { name: string; address: string }[];
  to: { name: string; address: string }[];
  subject: string;
  body: string;
  date: string;
}

export interface IReplyPayload {
  accountId: string;
  from: { name: string; address: string };
  to: { name: string; address: string };
  emailTemplate: { subject: string; emailBody: string };
  messageId: string;
  threadId: string;
}

export const inboxService = {
  /**
   * Get all mailboxes for an account
   */
  async getMailboxes(accountId: string): Promise<IMailbox[]> {
    const response = await emailApi.get(`/accounts/${accountId}/mailboxes`);
    return response.data;
  },

  /**
   * Get all email threads for an account
   */
  async getEmailThreads(
    accountId: string,
    page = 1,
    limit = 10,
    filters: string[] = []
  ): Promise<{ messages: IEmailThread[]; totalMessages: number; currentPage: number }> {
    const params: Record<string, unknown> = { page, limit };
    if (filters.length > 0) {
      params.filters = JSON.stringify(filters);
    }
    const response = await emailApi.get(`/accounts/${accountId}/allThreads`, { params });
    return {
      messages: response.data?.data?.messages || [],
      totalMessages: response.data?.data?.totalMessages || 0,
      currentPage: Number(response.data?.data?.currentPage) || 1,
    };
  },

  /**
   * Get messages in a thread
   */
  async getThreadMessages(accountId: string, threadId: string): Promise<IThreadMessage[]> {
    const response = await emailApi.get(`/accounts/${accountId}/thread/${threadId}`);
    return Array.isArray(response.data) ? response.data : [];
  },

  /**
   * Search emails
   */
  async searchEmails(
    accountId: string,
    mailboxId: string,
    search: string,
    page = 1,
    limit = 10
  ): Promise<{ messages: IEmailThread[] }> {
    const response = await emailApi.get(`/accounts/${accountId}/${mailboxId}/messages`, {
      params: { limit, page, search },
    });
    return response.data.data;
  },

  /**
   * Mark thread as read
   */
  async markThreadAsRead(threadId: string): Promise<void> {
    await emailApi.patch('/accounts/message/read-thread', { threadId });
  },

  /**
   * Send reply email
   */
  async sendReply(payload: IReplyPayload): Promise<{ code: number; message: string }> {
    const response = await emailApi.post('/accounts/send-reply-email', payload);
    return response.data;
  },

  /**
   * Reload mailboxes
   */
  async reloadMailboxes(accountId: string): Promise<void> {
    await emailApi.post(`/accounts/${accountId}/loadmailboxes`);
  },

  /**
   * Reload messages
   */
  async reloadMessages(accountId: string): Promise<void> {
    await emailApi.post(`/accounts/${accountId}/load-messages`);
  },


  /**
   * Send test email
   */
  async sendTestEmail(data: {
    email: string | string[];
    toEmail: string;
    emailTemplate: {
      subject: string;
      emailBody: string;
    };
  }): Promise<{ code: number; message: string }> {
    const response = await emailApi.post('/accounts/send-test-email', data);
    return response.data;
  },

  /**
   * Get email accounts
   */
  async getEmailAccounts(organizationId: string): Promise<{ data: Account[] }> {
    const response = await emailApi.get(`/accounts?orgId=${organizationId}`);
    return response.data;
  },
};

