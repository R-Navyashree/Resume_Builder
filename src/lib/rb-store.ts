export interface StepArtifact {
  uploaded: boolean;
  timestamp?: string;
  screenshot?: string;
  status?: "worked" | "error";
}

export interface RBStore {
  artifacts: Record<string, StepArtifact>;
  lovableLink?: string;
  githubLink?: string;
  deployLink?: string;
}

const STORAGE_KEY = "kodnest_rb_store";

export function getStore(): RBStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { artifacts: {} };
}

export function saveStore(store: RBStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getArtifact(stepNum: number): StepArtifact {
  const store = getStore();
  return store.artifacts[`rb_step_${stepNum}_artifact`] || { uploaded: false };
}

export function saveArtifact(stepNum: number, artifact: StepArtifact) {
  const store = getStore();
  store.artifacts[`rb_step_${stepNum}_artifact`] = artifact;
  saveStore(store);
}

export function isStepUnlocked(stepNum: number): boolean {
  if (stepNum === 1) return true;
  const prev = getArtifact(stepNum - 1);
  return prev.uploaded;
}

export function getCompletedCount(): number {
  let count = 0;
  for (let i = 1; i <= 8; i++) {
    if (getArtifact(i).uploaded) count++;
  }
  return count;
}

export const STEPS = [
  { num: 1, slug: "01-problem", title: "Problem Statement", short: "Problem" },
  { num: 2, slug: "02-market", title: "Market Research", short: "Market" },
  { num: 3, slug: "03-architecture", title: "Architecture", short: "Arch" },
  { num: 4, slug: "04-hld", title: "High-Level Design", short: "HLD" },
  { num: 5, slug: "05-lld", title: "Low-Level Design", short: "LLD" },
  { num: 6, slug: "06-build", title: "Build", short: "Build" },
  { num: 7, slug: "07-test", title: "Test", short: "Test" },
  { num: 8, slug: "08-ship", title: "Ship", short: "Ship" },
] as const;
