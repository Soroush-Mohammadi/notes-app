export function useRandomId() {
  const generateId = () => {
    const randomStr = Math.random().toString(36).slice(2, 11)
    return randomStr
  }

  return {
    generateId,
  }
}
