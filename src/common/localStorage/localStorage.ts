export type Setting = {
  theme: string;
  sort: string;
};
export const loadSetting = (): undefined | Setting => {
  try {
    const serializedSetting = localStorage.getItem("setting");
    if (serializedSetting === null) {
      return undefined;
    }
    return JSON.parse(serializedSetting);
  } catch (err) {
    return undefined;
  }
};
export const saveSetting = (setting: Setting) => {
  try {
    const serializedSetting = JSON.stringify(setting);
    localStorage.setItem("setting", serializedSetting);
  } catch {
    // ignore write errors
  }
};
