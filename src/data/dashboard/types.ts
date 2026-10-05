// Shared types for the iSay member dashboard prototype.
// The UI is derived entirely from these shapes — no state should be
// hardcoded directly into markup.

export type OpportunityType =
  | 'survey'
  | 'specialStudy'
  | 'productTrial'
  | 'diary'
  | 'featuredPoll'
  | 'profileCompletion';

export interface Opportunity {
  id: string;
  type: OpportunityType;
  title: string;
  description: string;
  pointsLabel: string; // e.g. "150 points" or "Up to 200 points"
  metaLabel?: string; // e.g. "12 min" or "Ends in 3 days"
  ctaLabel: string;
  ctaHref: string;
  badge?: string; // "New", "Featured", "Closing soon"
  progress?: { current: number; target: number };
}

export type PrimaryActionKind = 'survey' | 'reward' | 'dailyChallenge' | 'study' | 'profile';

export interface PrimaryAction {
  kind: PrimaryActionKind;
  eyebrow: string;
  heading: string;
  description: string;
  pointsLabel?: string;
  metaLabel?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export interface ProgressOverview {
  points: number;
  rewardThreshold: number;
  rewardLabel: string;
  canRedeem: boolean;
  profileCompletion: number; // 0-100
}

export type RewardStatus = 'redeemable' | 'inReach' | 'locked';

export interface Reward {
  id: string;
  title: string;
  points: number;
  image: string; // key into the rewardImages map
  status: RewardStatus;
}

export type DailyEngagementIcon = 'question' | 'wheel' | 'predictor';

export interface DailyEngagementItem {
  id: string;
  title: string;
  description: string;
  pointsLabel: string;
  ctaLabel: string;
  ctaHref: string;
  icon: DailyEngagementIcon;
  completed?: boolean;
}

export interface Referral {
  pointsLabel: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  tag?: string;
}

export interface DashboardState {
  id: string;
  label: string;
  devNote: string;
  primaryAction: PrimaryAction;
  progress: ProgressOverview;
  opportunities: Opportunity[];
  rewards: Reward[];
  dailyEngagement: DailyEngagementItem[];
  dailyEngagementEmphasized?: boolean;
  referral: Referral;
}
