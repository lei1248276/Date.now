import './style.css';
import { saveButton } from '@/components/palette';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="palette">
    <input id="color" type="color" value="#d84942" />
    <button id="save">Save</button>
  </div>
`;

saveButton(document.querySelector<HTMLButtonElement>('#save')!);
