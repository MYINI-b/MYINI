import { useLayoutEffect, useState } from 'react';
import './style.scss';

// 3rd party
import 'vuerd';
import { CanvasState } from 'vuerd/types/engine/store/canvas.state';

export default function GenerateVuerd(props: any) {
  const [canvasData, getCanvasData] = useState<CanvasState[]>([]);

  const { erdData } = props;
  const { onCurrentErd } = props;
  const { erdName } = props;

  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     editor.width = window.innerWidth * 0.96;
  //     editor.height = window.innerHeight;
  //   });
  //   window.dispatchEvent(new Event('resize'));
  // }, []);

  useLayoutEffect(() => {
    generateVuerd();
    // console.log(props)
  }, []);

  const generateVuerd = () => {
    // vuerd import
    const container: any = document.querySelector('#app-erd');
    let editor: any;
    if (container?.children.item(0)) {
      container.removeChild(container.children.item(0));
      editor = document.createElement('erd-editor');
    } else editor = document.createElement('erd-editor');

    container?.appendChild(editor);

    window.addEventListener('resize', () => {
      editor.width = window.innerWidth * 0.97;
      editor.height = window.innerHeight;
    });
    window.dispatchEvent(new Event('resize'));
  };

  return <div id="app-erd" />;
}
