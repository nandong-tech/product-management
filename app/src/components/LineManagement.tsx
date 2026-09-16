import { useRef, useState } from 'react';
import BasicPageTemplate from './BasicPageTemplate';
import {
  displayName,
  formatMsisdn,
  isPendingActive,
  visibleLines,
  type ManagedLine,
} from '../data/lines';

type Channel = 'app' | 'web';
type Dialog = { type: 'remove' | 'transfer-admin'; line: ManagedLine } | null;

type Props = {
  lines: ManagedLine[];
  isGroupAdmin: boolean;
  channel: Channel;
  listOnly?: boolean;
  inviteMessage?: string | null;
  onBack: () => void;
  onAddLine: () => void;
  onOpenDetails: (lineId: string) => void;
  onRemoveLine: (lineId: string) => void;
  onSetAdmin: (lineId: string) => void;
  onTransferBalance: (lineId: string) => void;
};

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        fill="currentColor"
        d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"
      />
    </svg>
  );
}

/** Line Management (LF-S-045) */
export default function LineManagement({
  lines,
  isGroupAdmin,
  channel,
  listOnly = false,
  inviteMessage,
  onBack,
  onAddLine,
  onOpenDetails,
  onRemoveLine,
  onSetAdmin,
  onTransferBalance,
}: Props) {
  const shown = visibleLines(lines);
  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<Dialog>(null);
  const touchStartX = useRef<number | null>(null);
  const ignoreClick = useRef(false);

  const closeDialog = () => setDialog(null);

  const handleRowSelect = (line: ManagedLine) => {
    if (ignoreClick.current) {
      ignoreClick.current = false;
      return;
    }
    if (listOnly) {
      if (line.invitationAccepted) onTransferBalance(line.id);
      return;
    }
    if (isGroupAdmin && line.invitationAccepted) {
      onOpenDetails(line.id);
    }
  };

  const handleSwipeStart = (clientX: number) => {
    if (listOnly) return;
    touchStartX.current = clientX;
  };

  const handleSwipeEnd = (line: ManagedLine, clientX: number) => {
    if (listOnly) return;
    if (touchStartX.current == null) return;
    const dx = clientX - touchStartX.current;
    touchStartX.current = null;
    if (isPendingActive(line) || !line.invitationAccepted) return;
    if (dx < -48) {
      ignoreClick.current = true;
      setRevealedId(line.id);
    } else if (dx > 48) {
      setRevealedId(null);
    }
  };

  return (
    <BasicPageTemplate title={listOnly ? 'Select a Line' : 'Line Management'} showBack onBack={onBack}>
      <div className="line-mgmt">
        {inviteMessage ? <p className="line-toast">{inviteMessage}</p> : null}

        {shown.length === 0 ? null : (
          <ul className="line-list">
            {shown.map((line) => {
                  const pending = isPendingActive(line);
                  const accepted = line.invitationAccepted;
                  const canManage = !listOnly && isGroupAdmin && accepted;
                  const revealed = channel === 'app' && revealedId === line.id;
              const name = displayName(line);
              return (
                <li
                  key={line.id}
                  className={`line-row${canManage && channel === 'web' ? ' line-row-web' : ''}${revealed ? ' line-row-revealed' : ''}${listOnly && accepted ? ' line-row-pick' : ''}${listOnly && !accepted ? ' line-row-static' : ''}`}
                  onClick={() => handleRowSelect(line)}
                  onMouseLeave={() => {
                    if (channel === 'app') return;
                    setRevealedId(null);
                  }}
                  onTouchStart={(e) => handleSwipeStart(e.changedTouches[0].clientX)}
                  onTouchEnd={(e) => handleSwipeEnd(line, e.changedTouches[0].clientX)}
                >
                  <div className="line-row-main">
                    {name ? <div className="line-name">{name}</div> : null}
                    {line.mobileDigits ? (
                      <div className="line-msisdn">{formatMsisdn(line.mobileDigits)}</div>
                    ) : null}
                    {pending ? <div className="line-pending">Pending</div> : null}
                    {!isGroupAdmin && line.isGroupAdmin ? (
                      <div className="line-admin-indicator">Group admin</div>
                    ) : null}
                  </div>
                  {canManage ? (
                    <div className="line-row-actions" onClick={(e) => e.stopPropagation()}>
                      {channel === 'web' ? (
                        <button
                          type="button"
                          className="line-icon-btn"
                          aria-label="Delete"
                          onClick={() => setDialog({ type: 'remove', line })}
                        >
                          <TrashIcon />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-secondary line-action-btn"
                          onClick={() => setDialog({ type: 'remove', line })}
                        >
                          Delete
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-secondary line-action-btn"
                        onClick={() => setDialog({ type: 'transfer-admin', line })}
                      >
                        Transfer admin
                      </button>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}

        {!listOnly && (isGroupAdmin || shown.length === 0) ? (
          <button type="button" className="btn btn-primary line-add-btn" onClick={onAddLine}>
            Add a new line
          </button>
        ) : null}
      </div>

      {dialog?.type === 'remove' && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="remove-line-title">
          <div className="modal">
            <h2 id="remove-line-title">Remove line</h2>
            <p>
              Are you sure you want to remove {displayName(dialog.line)} (
              {dialog.line.mobileDigits ? formatMsisdn(dialog.line.mobileDigits) : ''})?
            </p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeDialog}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onRemoveLine(dialog.line.id);
                  closeDialog();
                  setRevealedId(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog?.type === 'transfer-admin' && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="transfer-admin-title">
          <div className="modal">
            <h2 id="transfer-admin-title">Transfer admin</h2>
            <p>
              Are you sure you want to transfer the group admin to {displayName(dialog.line)} (
              {dialog.line.mobileDigits ? formatMsisdn(dialog.line.mobileDigits) : ''})?
            </p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeDialog}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onSetAdmin(dialog.line.id);
                  closeDialog();
                  setRevealedId(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </BasicPageTemplate>
  );
}
