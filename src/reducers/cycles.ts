export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
  }
  
  interface CycleState {
    cycles: Cycle[];
    activeCycleId: string | null;
  }
  
  export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
  }
  
  type CycleAction =
    | { type: ActionTypes.ADD_NEW_CYCLE; payload: { newCycle: Cycle } }
    | { type: ActionTypes.INTERRUPT_CURRENT_CYCLE }
    | { type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED }
  
  export function cyclesReducer(state: CycleState, action: CycleAction): CycleState {
    switch (action.type) {
      case ActionTypes.ADD_NEW_CYCLE:
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id,
        };
  
      case ActionTypes.INTERRUPT_CURRENT_CYCLE:
        return {
          ...state,
          cycles: state.cycles.map((cycle) =>
            cycle.id === state.activeCycleId
              ? { ...cycle, interruptedDate: new Date() }
              : cycle
          ),
          activeCycleId: null,
        };
  
      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
        return {
          ...state,
          cycles: state.cycles.map((cycle) =>
            cycle.id === state.activeCycleId
              ? { ...cycle, finishedDate: new Date() }
              : cycle
          ),
          activeCycleId: null,
        };
  
      default:
        return state;
    }
  }
  