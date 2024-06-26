import create from 'zustand';

const useStore = create((set) => ({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    clearUser: () => set({ user: null, token: null }),
}));

export default useStore;
