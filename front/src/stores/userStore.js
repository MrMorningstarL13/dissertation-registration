import { create } from "zustand";

const useUserStore = create((set) => ({
  email: "",
  firstName: "",
  lastName: "",
  group: 0,
  phone: "",
  specialization: "",
  year: 0,
  edFormat: "",
  isProfessor: 0,
  // email: "rares@stud.ase.ro",
  // firstName: "Rares",
  // lastName: "Visan",
  // group: 1108,
  // phone: "0724127365",
  // specialization: "ei-eng",
  // year: 2021,
  // edFormat: "ID",
  // isProfessor: 0,
  setEmail: (__email) => set({ email: __email }),
  setStudent: (stud) =>
    set({
      firstName: stud.firstName,
      lastName: stud.lastName,
      group: stud.group,
      phone: stud.phone,
      specialization: stud.specialization,
      year: stud.year,
      edFormat: stud.edFormat,
      isProfessor: 0
    }),

    setProfessor: (stud) =>
      set({
        firstName: stud.firstName,
        lastName: stud.lastName,
        phone: stud.phone,
        specialization: stud.specialization,
        isProfessor: 1
      }),


  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
}));

export default useUserStore;
