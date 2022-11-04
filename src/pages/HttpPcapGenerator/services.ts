import { request } from '@umijs/max';

interface HttpPcapRequest {
  httpRequest: string;
  httpResponse: string;
}

interface PcapInfo {
  downloadUrl: string;
}

interface PcapInfoResponse {
  success: boolean;
  data: PcapInfo;
}

function generatePcap(httpData: HttpPcapRequest) {
  return request<PcapInfoResponse>('/api/generatePcap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: httpData,
  });
}

export { generatePcap };

export type { HttpPcapRequest };
