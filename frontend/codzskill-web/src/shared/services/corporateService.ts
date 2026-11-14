
import apiClient from '../api/axiosInstance';
import { API_CONFIG } from '../api/apiEndPoints';
import type {
  CorporateProposalRequest,
  CorporateProposalResponse,
} from '../types';

export const corporateService = {
  async submitProposal(
    payload: CorporateProposalRequest
  ): Promise<CorporateProposalResponse> {
    if (!API_CONFIG.useMockData) {
      const { data } = await apiClient.post<CorporateProposalResponse>(
        API_CONFIG.endpoints.corporate.proposal,
        payload
      );
      return data;
    }

    await new Promise((res) => setTimeout(res, 450));

    return {
      referenceId: `CORP-${Math.floor(100000 + Math.random() * 900000)}`,
      message: `Thank you, ${payload.contactName}. Our Enterprise Solutions team will send a tailored curriculum proposal for ${payload.companyName} within 24 hours.`,
    };
  },
};
