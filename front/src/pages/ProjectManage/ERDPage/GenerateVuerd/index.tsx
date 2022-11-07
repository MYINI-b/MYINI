import { useEffect } from 'react';
import './style.scss';
import 'vuerd';

export default function GenerateVuerd() {
  useEffect(() => {
    const container = document.querySelector('#app-erd');
    const editor = document.createElement('erd-editor');
    container?.appendChild(editor);
    window.addEventListener('resize', () => {
      editor.width = window.innerWidth * 0.96;
      editor.height = window.innerHeight;
    });
    window.dispatchEvent(new Event('resize'));
  }, []);

  return <div id="app-erd" />;
}
