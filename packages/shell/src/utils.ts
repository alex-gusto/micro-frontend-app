const getAppId = (appName: string) => `single-spa-application:${appName}`;

export const findAppEl = (appName: string) => {
  return document.getElementById(getAppId(appName));
};

export const createAppEl = (appName: string) => {
  const div = document.createElement('div');
  div.id = getAppId(appName);
  document.body.append(div);

  return div;
};

export const createOrFindEl = (appName: string) => {
  const el = findAppEl(appName);
  if (el) return el;

  return createAppEl(appName);
};
