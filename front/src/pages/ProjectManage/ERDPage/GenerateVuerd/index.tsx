/* eslint-disable no-console */
/* eslint-disable object-shorthand */
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
import AWS from 'aws-sdk';
import { connect } from 'react-redux';

import './style.scss';
import { getApi } from 'api';

// 3rd party
import 'vuerd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { assignCurrentErd } from 'modules/vuerd';

const S3_BUCKET = 'myini/ERD';
const REGION = 'ap-northeast-2';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESSKEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRETACCESSKEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

interface Props {
  store: any;
  pid: string;
}

function GenerateVuerd({ pid, store }: Props) {
  const erdDiv = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [saveErdValue, setErdValue] = useState('');

  useLayoutEffect(() => {
    generateVuerd();
  }, [store]);

  const generateVuerd = async () => {
    // vuerd import
    const container: any = document.querySelector('#app-erd');
    let editor: any;

    if (container?.children.item(0)) {
      container.removeChild(container.children.item(0));
      editor = document.createElement('erd-editor');
    } else editor = document.createElement('erd-editor');

    container?.appendChild(editor);

    // 테마
    editor.setTheme({
      canvas: '#f4f4f4',
      table: '#fff',
      tableActive: '#ed4e3b',
      focus: '#ed4e3b',
      keyPK: '#3e6ae1',
      keyFK: '#fbb01b',
      keyPFK: '#393c41',
      font: '#171a20',
      fontActive: '#171a20',
      fontPlaceholder: '#a2a3a5',
      contextmenu: '#fff',
      contextmenuActive: '#fff',
      edit: '#fbb01b',
      columnSelect: '#f4f4f4',
      columnActive: '#f4f4f4',
      minimapShadow: '#a2a3a5',
      scrollbarThumb: '#6D6D6D',
      scrollbarThumbActive: '#a2a2a2',
      menubar: '#FCAF92',
      visualization: '#f4f4f4',
    });

    // import project erd
    if (pid) {
      getApi(`erds/erdjson/${pid}`)
        .then((res: any) => {
          store.pjt.erdData = JSON.stringify(res.data);
          editor.initLoadJson(store.pjt.erdData);
        })
        .catch((err: any) => {
          console.log(err, '새로운 프로젝트입니다.');
        });
    }

    // TODO: 변경사항?
    editor.addEventListener('change', (event: any) => {
      // const targetValue = JSON.parse(event.target.value);
      // console.log(targetValue);
      // const totalValue = {
      //   canvas: targetValue.canvas,
      //   table: targetValue.table,
      //   memo: targetValue.memo,
      //   relationship: targetValue.relationship,
      // };
      // store.pjt.erdData = JSON.stringify(totalValue);
      // setErdValue(store.pjt.erdData);
      // console.log(editor.value, 'zzz');
      // editor.dispatch(store.pjt.erdData);
      // console.log(totalValue, '?');
      // saveBtn();
      store.pjt.erdData = editor.value;
      saveBtn();
      editor.initLoadJson(store.pjt.erdData);
      // console.log(store.pjt.erdData, '?');
    });

    // vuerd size
    window.addEventListener('resize', () => {
      editor.width = window.innerWidth * 0.96;
      editor.height = window.innerHeight;
    });
    window.dispatchEvent(new Event('resize'));
  };

  // 저장버튼
  const saveBtn = () => {
    const obj: any = {
      editor: erdDiv.current.children.item(0),
    };
    // console.log(obj.editor.value, 'asd');
    // setErdValue(obj.editor.value);
    // canvas, tabel, memo, relationship

    // for vuerd version 1.2.2
    // const isCanvasState = obj.editor.context.store.canvasState;
    // const isMemoState = obj.editor.context.store.memoState;
    // const isTableState = obj.editor.context.store.tableState;
    // const isRelationshipState = obj.editor.context.store.relationshipState;
    // const combinedState = {
    //   canvas: isCanvasState,
    //   table: isTableState,
    //   memo: isMemoState,
    //   relationship: isRelationshipState,
    // };

    // for vuerd version 2.2.2
    const combinedState = obj.editor.value;

    // fileName
    const fileName = `${pid}.myini.json`;
    const uploadFile = () => {
      const params = {
        ACL: 'public-read',
        Body: combinedState,
        Bucket: S3_BUCKET,
        Key: fileName,
      };
      myBucket.putObject(params).send((err) => {
        if (err) console.log(err, 's3 error');
      });
    };
    uploadFile();
    // alert('저장했습니다.');
  };
  return (
    <>
      <div id="app-erd" ref={erdDiv} />
      <br />
    </>
  );
}

/* <button type="button" onClick={saveBtn} className="erd-save-btn">
<FontAwesomeIcon icon={faSave} />
</button> */

const mapToDispatch = (dispatch: any) => ({
  currentErd: (action: any) => dispatch(assignCurrentErd(action)),
});

export default connect(null, mapToDispatch)(GenerateVuerd);
