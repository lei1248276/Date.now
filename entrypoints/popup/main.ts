import './style.css';
import { setupCounter } from '@/components/counter';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <button id="counter" type="button"></button>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
