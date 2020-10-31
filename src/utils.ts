export interface IProps {
  token?: string;
  inventoryId?: string;
}

export const updateObject = <T>(oldObject: T, updatedProperties: T): T => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};
