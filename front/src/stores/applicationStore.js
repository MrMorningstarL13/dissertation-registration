import { create } from "zustand";

const useApplicationStore = create((set) => ({
  applicationStep: 1,
  increaseStep: () => set(state => ({ applicationStep: state.applicationStep + 1 })),
  decreaseStep: () => set(state => ({ applicationStep: state.applicationStep - 1 })),
  setStep: (step) => set({ applicationStep: step }),
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
}));

export default useApplicationStore;
