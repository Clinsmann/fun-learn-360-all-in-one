const createActionType = (type: string) => {
  type = type.toUpperCase();
  return {
    default: type,
    pending: type + "_PENDING",
    rejected: type + "_REJECTED",
    fulfilled: type + "_FULFILLED",
  }
}

export default createActionType;
