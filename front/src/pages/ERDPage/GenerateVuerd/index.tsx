import { useEffect } from 'react';
import './style.scss';

import 'vuerd';

export default function GenerateVuerd() {
  useEffect(() => {
    const container = document.querySelector('#app-erd');
    const editor = document.createElement('erd-editor');

    editor.setTheme({
      canvas: '#282828',
      table: '#191919',
      tableActive: '#14496d',
      focus: '#00a9ff',
      keyPK: '#B4B400',
      keyFK: '#dda8b1',
      keyPFK: '#60b9c4',
      font: '#a2a2a2',
      fontActive: 'white',
      fontPlaceholder: '#6D6D6D',
      contextmenu: '#191919',
      contextmenuActive: '#383d41',
      edit: '#ffc107',
      columnSelect: '#232a2f',
      columnActive: '#372908',
      minimapShadow: 'black',
      scrollbarThumb: '#6D6D6D',
      scrollbarThumbActive: '#a2a2a2',
      menubar: 'black',
      visualization: '#191919',
    });

    container?.appendChild(editor);
    window.addEventListener('resize', () => {
      editor.width = window.innerWidth * 0.96;
      editor.height = window.innerHeight;
    });
    window.dispatchEvent(new Event('resize'));
  }, []);

  return <div id="app-erd" />;
}
