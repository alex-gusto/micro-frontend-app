import type { SingleSpaCustomEventDetail } from 'single-spa';
import { findAppEl } from '../utils';

const LOADER_ID = 'loader';

const loader = document.getElementById(LOADER_ID);

function hideLoader() {
  setTimeout(() => loader?.classList.add('hidden'));
}

function showLoader() {
  loader?.classList.remove('hidden');
}

window.addEventListener('single-spa:before-app-change', e => {
  showLoader();

  const { detail } = <CustomEvent<SingleSpaCustomEventDetail>>e;
  Object.entries(detail.newAppStatuses).forEach(([appName, status]) => {
    const appEl = findAppEl(appName);
    if (!appEl) return;

    if (status === 'NOT_MOUNTED') {
      appEl.classList.remove('active');
    }
  });
});

window.addEventListener('single-spa:app-change', e => {
  const { detail } = <CustomEvent<SingleSpaCustomEventDetail>>e;
  Object.entries(detail.newAppStatuses).forEach(([appName, status]) => {
    const appEl = findAppEl(appName);

    if (!appEl) return;

    if (status === 'MOUNTED') {
      appEl.classList.add('active');
    }
  });

  hideLoader();
});

export {};
