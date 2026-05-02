export type ApplyMoveResult = {
  ok: boolean;
  reason?: string;
  fen?: string;
};

export function applyMove(_fen: string, _uci: string): ApplyMoveResult {
  // TODO: integrate chess.js and authoritative validation.
  return { ok: true, fen: _fen };
}
