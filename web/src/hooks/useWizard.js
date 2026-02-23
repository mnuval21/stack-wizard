import { useReducer, useMemo } from 'react';
import { STEPS, getVisibleSteps } from '../data/steps';
import { buildRecommendation } from '../data/recommendations';

const INITIAL_SELECTIONS = {
  environment: null,
  vpsProvider: null,
  llmType: null,
  voiceTranscription: null,
  tts: null,
  securityPosture: null,
  gpuType: null,
};

const initialState = {
  currentStepIndex: 0,
  selections: { ...INITIAL_SELECTIONS },
};

// Keys that depend on a given selection — if that selection changes, clear these
const DEPENDENCY_MAP = {
  environment: ['vpsProvider', 'securityPosture', 'gpuType'],
  llmType: ['securityPosture', 'gpuType'],
  voiceTranscription: ['gpuType'],
  tts: ['gpuType'],
};

function clearDependentSelections(selections, changedKey) {
  const depKeys = DEPENDENCY_MAP[changedKey] || [];
  const updated = { ...selections };
  depKeys.forEach((key) => {
    updated[key] = null;
  });
  return updated;
}

function wizardReducer(state, action) {
  switch (action.type) {
    case 'SELECT_CHOICE': {
      const { stepId, value } = action.payload;
      let newSelections = { ...state.selections, [stepId]: value };

      // If changing a selection that already had a value, clear dependents
      if (state.selections[stepId] !== null && state.selections[stepId] !== value) {
        newSelections = clearDependentSelections(newSelections, stepId);
        newSelections[stepId] = value;
      }

      const visibleSteps = getVisibleSteps(newSelections);
      const currentVisibleIndex = visibleSteps.findIndex((s) => s.id === stepId);
      const nextIndex = Math.min(currentVisibleIndex + 1, visibleSteps.length - 1);

      return {
        ...state,
        selections: newSelections,
        currentStepIndex: nextIndex,
      };
    }

    case 'GO_BACK': {
      const visibleSteps = getVisibleSteps(state.selections);
      const prevIndex = Math.max(state.currentStepIndex - 1, 0);
      return {
        ...state,
        currentStepIndex: prevIndex,
      };
    }

    case 'GO_TO_STEP': {
      const visibleSteps = getVisibleSteps(state.selections);
      const targetIndex = visibleSteps.findIndex((s) => s.id === action.payload.stepId);
      if (targetIndex >= 0) {
        return { ...state, currentStepIndex: targetIndex };
      }
      return state;
    }

    case 'RESET':
      return {
        currentStepIndex: 0,
        selections: { ...INITIAL_SELECTIONS },
      };

    default:
      return state;
  }
}

export function useWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const visibleSteps = useMemo(
    () => getVisibleSteps(state.selections),
    [state.selections]
  );

  const currentStep = visibleSteps[state.currentStepIndex] || visibleSteps[0];

  const recommendation = useMemo(
    () => buildRecommendation(state.selections),
    [state.selections]
  );

  const isFirstStep = state.currentStepIndex === 0;
  const isLastStep = state.currentStepIndex === visibleSteps.length - 1;
  const isSummaryStep = currentStep?.id === 'summary';
  const progress = state.currentStepIndex / (visibleSteps.length - 1);

  return {
    state,
    currentStep,
    visibleSteps,
    recommendation,
    isFirstStep,
    isLastStep,
    isSummaryStep,
    progress,
    selectChoice: (stepId, value) =>
      dispatch({ type: 'SELECT_CHOICE', payload: { stepId, value } }),
    goBack: () => dispatch({ type: 'GO_BACK' }),
    goToStep: (stepId) =>
      dispatch({ type: 'GO_TO_STEP', payload: { stepId } }),
    reset: () => dispatch({ type: 'RESET' }),
  };
}
