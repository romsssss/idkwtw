type ProposalRejectedFeedback = 'too_long' | 'too_old' | 'too_violent' | 'too_scary';
type ProposalAlreadySeenFeedback = 'liked' | 'disliked' | 'do_not_remember';

interface Proposal {
  uuid: string,
  search_session_uuid: string,
  tconst: string,
  accepted: boolean | null,
  rejected_feedback: ProposalRejectedFeedback | null,
  already_seen: boolean | null,
  already_seen_feedback: ProposalAlreadySeenFeedback | null
}


export { type Proposal };
