import { useLayoutEffect, useState } from 'react';
import { RootState } from 'modules';
import { ERD } from 'modules/erd';

import { connect, useSelector, useDispatch } from 'react-redux';
import './style.scss';

// 3rd party
import 'vuerd';

import { assignCurrentErd } from 'modules/vuerd';

const mapToDispatch = (dispatch: any) => ({
  onCurrentErd: (action: string) => dispatch(assignCurrentErd(action)),
});

function GenerateVuerd(props: any) {
  const getERDData = useSelector((state: RootState) => state.erd);

  // const dispatch = useDispatch();

  const { erdData } = props;
  const { onCurrentErd } = props;
  const { erdName } = props;

  useLayoutEffect(() => {
    generateVuerd();
    // dispatch(ERD(onCurrentErd));
  }, [erdData]);

  const generateVuerd = () => {
    // vuerd import
    const container: any = document.querySelector('#app-erd');
    let editor: any;
    if (container?.children.item(0)) {
      container.removeChild(container.children.item(0));
      editor = document.createElement('erd-editor');
    } else editor = document.createElement('erd-editor');

    container?.appendChild(editor);
    const payload = { editor };
    console.log(payload, 'pay');

    console.log(onCurrentErd, 'onCurrent');
    // onCurrentErd(payload);

    window.addEventListener('resize', () => {
      editor.width = window.innerWidth * 0.97;
      editor.height = window.innerHeight;
    });
    window.dispatchEvent(new Event('resize'));
  };

  return <div id="app-erd" />;
}

export default connect(null, mapToDispatch)(GenerateVuerd);
