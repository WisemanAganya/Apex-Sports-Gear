// Simplified Firebase mock
export const db = {
  collection: () => ({
    doc: () => ({
      get: async () => ({ exists: false, data: () => ({}) }),
      set: async () => {},
      update: async () => {},
    })
  })
} as any;

export const auth = {
  currentUser: null,
  onAuthStateChanged: () => () => {},
} as any;
