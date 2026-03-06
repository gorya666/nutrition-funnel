export type AgeBucket = "under18" | "age18_24" | "age25_34" | "age35_44" | "age45_55" | "age55plus";
export type PaceKey = "slow" | "optimal" | "fast";
export type GenderKey = "male" | "female" | "prefer_not_to_say";

type QuizState = {
  gender?: GenderKey;
  ageBucket?: AgeBucket;
  currentWeightKg?: number;
  heightCm?: number;
  desiredWeightKg?: number;
  targetWeightKg?: number;
  milestoneLossKg?: number;
  milestoneWeightKg?: number;
  paceKey?: PaceKey;
  paceKgPerWeek?: number;
  goalDateISO?: string;
};

const QUIZ_STORAGE_KEY = "nutrition-funnel.quiz";
const EMPTY_SNAPSHOT: QuizState = {};

let memoryState: QuizState = {};
let snapshot: QuizState = {};
let hasSnapshot = false;
const listeners = new Set<() => void>();

function readStorageState(): QuizState {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as QuizState;
    return parsed ?? {};
  } catch {
    return {};
  }
}

function writeStorageState(state: QuizState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state));
}

function clearStorageState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(QUIZ_STORAGE_KEY);
}

function updateSnapshot(nextState: QuizState) {
  snapshot = nextState;
  hasSnapshot = true;
  listeners.forEach((listener) => listener());
}

function getMergedState(): QuizState {
  return {
    ...readStorageState(),
    ...memoryState,
  };
}

export function setAgeBucket(ageBucket: AgeBucket) {
  const nextState = {
    ...getMergedState(),
    ageBucket,
  };

  memoryState = nextState;
  writeStorageState(nextState);
  updateSnapshot(nextState);
}

export function setGender(gender: GenderKey) {
  const nextState = {
    ...getMergedState(),
    gender,
  };

  memoryState = nextState;
  writeStorageState(nextState);
  updateSnapshot(nextState);
}

export function setBodyMetrics(currentWeightKg: number, heightCm: number) {
  const nextState = {
    ...getMergedState(),
    currentWeightKg,
    heightCm,
    desiredWeightKg: undefined,
    milestoneLossKg: undefined,
    milestoneWeightKg: undefined,
    paceKey: undefined,
    paceKgPerWeek: undefined,
    goalDateISO: undefined,
  };

  memoryState = nextState;
  writeStorageState(nextState);
  updateSnapshot(nextState);
}

export function setDesiredWeight(desiredWeightKg: number) {
  const nextState = {
    ...getMergedState(),
    desiredWeightKg,
    milestoneLossKg: undefined,
    milestoneWeightKg: undefined,
    paceKey: undefined,
    paceKgPerWeek: undefined,
    goalDateISO: undefined,
  };

  memoryState = nextState;
  writeStorageState(nextState);
  updateSnapshot(nextState);
}

export function setTargetWeight(targetWeightKg: number) {
  const nextState = {
    ...getMergedState(),
    targetWeightKg,
  };

  memoryState = nextState;
  writeStorageState(nextState);
  updateSnapshot(nextState);
}

export function setMilestone(milestoneLossKg: number, milestoneWeightKg: number) {
  const nextState = {
    ...getMergedState(),
    milestoneLossKg,
    milestoneWeightKg,
  };

  memoryState = nextState;
  writeStorageState(nextState);
  updateSnapshot(nextState);
}

export function setPacePlan(paceKey: PaceKey, paceKgPerWeek: number, goalDateISO: string) {
  const nextState = {
    ...getMergedState(),
    paceKey,
    paceKgPerWeek,
    goalDateISO,
  };

  memoryState = nextState;
  writeStorageState(nextState);
  updateSnapshot(nextState);
}

export function clearQuizState() {
  memoryState = {};
  clearStorageState();
  updateSnapshot({});
}

export function getQuizState(): QuizState {
  return getMergedState();
}

export function subscribeQuizState(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getQuizSnapshot(): QuizState {
  if (!hasSnapshot) {
    snapshot = getMergedState();
    hasSnapshot = true;
  }

  return snapshot;
}

export function getQuizServerSnapshot(): QuizState {
  return EMPTY_SNAPSHOT;
}
