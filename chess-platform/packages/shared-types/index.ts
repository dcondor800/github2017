export type TimeMode = 'bullet' | 'blitz' | 'rapid' | 'classical';

export interface QueueJoinPayload {
  mode: TimeMode;
  timeControl: string;
}
