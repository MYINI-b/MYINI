/* eslint-disable object-shorthand */
import { useLayoutEffect } from 'react';

import { connect } from 'react-redux';
import './style.scss';

// 3rd party
import 'vuerd';

import { assignCurrentErd } from 'modules/vuerd';

function GenerateVuerd(props: any) {
  const { erdData } = props;
  const { onCurrentErd } = props;
  const { erdName } = props;

  useLayoutEffect(() => {
    generateVuerd();
    // dispatch(ERD(onCurrentErd));
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
    console.log(container, 'container');
    const payload = {
      editor: editor,
    };
    console.log(payload, 'payload');
    // onCurrentErd({ payload });
    // console.log(onCurrentErd, 'asdsadsa?');

    // editor.initLoadJson(erdData);

    window.addEventListener('resize', () => {
      editor.width = window.innerWidth * 0.96;
      editor.height = window.innerHeight;
    });
    window.dispatchEvent(new Event('resize'));
  };

  return <div id="app-erd" />;
}

const mapToDispatch = (dispatch: any) => ({
  onCurrentErd: (action: any) => dispatch(assignCurrentErd(action)),
});

export default connect(null, mapToDispatch)(GenerateVuerd);
