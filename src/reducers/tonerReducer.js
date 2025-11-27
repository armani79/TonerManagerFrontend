const initalState = {
   toners: [],
};

export default function tonerReducer(state = initalState, action) {
   switch (action.type) {
      case "SET_TONERS":
         return {
            ...state,
            toners: action.payload,
         };
      case "ADD_TONER":
         return {
            ...state,
            toners: [...state.toners, action.payload],
         };
      case "DELETE_TONER":
         return {
            ...state,
            toners: state.toners.filter((toner) => toner.id !== action.payload),
         };
      default:
         return state;
   }
}
