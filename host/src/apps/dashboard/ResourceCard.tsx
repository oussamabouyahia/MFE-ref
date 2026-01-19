// /apps/dashboard/src/store/resourceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Resource {
  id: string;
  name: string;
  capacityHours: number;
  bookedHours: number;
  // TODO: Add capacity fields here
}

interface ResourceState {
  items: Resource[];
}

const initialState: ResourceState = {
  items: [
    { id: "1", name: "Oussama", capacityHours: 40, bookedHours: 20 }, // Missing data
    { id: "2", name: "Hendrik", capacityHours: 40, bookedHours: 55 },
  ],
};

export const resourceSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    updateResourceHours: (
      state,
      action: PayloadAction<{ id: string; booked: number; capacity: number }>
    ) => {
      state.items.forEach((item) => {
        if (
          item.id === action.payload.id &&
          action.payload.booked > action.payload.capacity
        ) {
          item.bookedHours = action.payload.booked;
          item.capacityHours = action.payload.capacity;
        }
      });
    },
  },
});
export const selectOverbookedResources = (state: ResourceState) => {
  return state.items.filter(
    (resource) => resource.bookedHours > resource.capacityHours
  );
};
export const { updateResourceHours } = resourceSlice.actions;
export default resourceSlice.reducer;
