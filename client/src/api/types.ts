export interface QueryTypes {
  name?: string;
  pageNum?: number;
  pageSize?: number;
}

export interface Message {
  body: string;
  error: boolean;
}

export interface MessageResponse {
  message: Message
}
