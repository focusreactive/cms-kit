import { Preset } from "../../types";

const localStorageClickboardKey = 'cms-kit-clipboard';

export const saveContentBlockToLS = (data: Preset['value']): void => {
  localStorage.setItem(
    localStorageClickboardKey,
    JSON.stringify({ ...data, _key: undefined }),
  );
};

export const retrieveContentBlockFromLS = (): Preset['value'] | null => {
  const storedData = localStorage.getItem(localStorageClickboardKey);

  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing stored data:', error);

      localStorage.removeItem(localStorageClickboardKey);
    }
  }

  return null;
};
