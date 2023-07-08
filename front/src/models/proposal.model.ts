export const proposalRejectedFeedback = ['too_long', 'too_old', 'too_violent', 'too_scary'] as const;
export const proposalAlreadySeenFeedback = ['liked', 'disliked', 'do_not_remember'] as const;

type ProposalRejectedFeedback = typeof proposalRejectedFeedback[number];
type ProposalAlreadySeenFeedback = typeof proposalAlreadySeenFeedback[number];

export interface Proposal {
  uuid: string,
  search_session_uuid: string,
  tconst: string,
  accepted: boolean | null,
  rejected_feedback: ProposalRejectedFeedback | null,
  already_seen: boolean | null,
  already_seen_feedback: ProposalAlreadySeenFeedback | null
}
