export function saveButton(element: HTMLButtonElement) {
  const palette = document.querySelector<HTMLInputElement>('#color')!;
  
  element.addEventListener('click', () => {
    browser.storage.sync.set({ color: palette.value });
    browser.runtime.sendMessage('updateIcon');
  });
}