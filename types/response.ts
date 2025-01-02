export interface ApiResponse {
  timestamp: Date;
  status: "success" | "error";
  message: string;
  responseStatus: number;
  result: any;
  isCached?: boolean;
}
