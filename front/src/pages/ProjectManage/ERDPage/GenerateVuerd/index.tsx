/* eslint-disable no-console */
/* eslint-disable object-shorthand */
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AWS from 'aws-sdk';
import { connect, useDispatch, useSelector } from 'react-redux';

import './style.scss';
import { getApi } from 'api';

// 3rd party
import 'vuerd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';

import { assignCurrentErd } from 'modules/vuerd';
import { ERD } from 'modules/erd';
import { RootState } from 'modules/Reducers';

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
  const { editor } = useSelector((state: RootState) => state.vuerd);
  const erdDiv = useRef() as React.MutableRefObject<HTMLDivElement>;

  useLayoutEffect(() => {
    generateVuerd();
    console.log(erdDiv.current, 'erddiv');
  }, []);

  const generateVuerd = async () => {
    // vuerd import
    const container: any = document.querySelector('#app-erd');
    let editor: any;

    if (container?.children.item(0)) {
      container.removeChild(container.children.item(0));
      editor = document.createElement('erd-editor');
    } else editor = document.createElement('erd-editor');

    container?.appendChild(editor);
    const payload: any = {
      editor,
    };

    // import project erd
    if (pid) {
      await getApi(`erds/erdjson/${pid}`)
        .then((res: any) => {
          console.log(res.data, 'res');
          editor.initLoadJson(JSON.stringify(res.data));
        })
        .catch((err: any) => {
          console.log(err, '새로운 프로젝트입니다.');
        });
    }

    console.log(payload);
    store.pjt.erd = payload;
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
    // canvas, tabel, memo, relationship
    const isCanvasState = obj.editor.context.store.canvasState;
    const isMemoState = obj.editor.context.store.memoState;
    const isTableState = obj.editor.context.store.tableState;
    const isRelationshipState = obj.editor.context.store.relationshipState;
    const combinedState = {
      canvas: isCanvasState,
      table: isTableState,
      memo: isMemoState,
      relationship: isRelationshipState,
    };
    const stateToJson = JSON.stringify(combinedState);
    console.log(isTableState, 'istable');
    console.log(obj.editor.context, 'editor');
    // fileName
    const fileName = `${pid}.myini.json`;
    console.log('hi');
    const uploadFile = () => {
      const params = {
        ACL: 'public-read',
        Body: stateToJson,
        Bucket: S3_BUCKET,
        Key: fileName,
      };
      myBucket.putObject(params).send((err) => {
        if (err) console.log(err, 's3 error');
      });
    };
    uploadFile();
  };
  return (
    <>
      <button type="button" onClick={saveBtn}>
        <FontAwesomeIcon icon={faSave} className="erd-save-btn" />
      </button>
      <div id="app-erd" ref={erdDiv} />
      <br />
    </>
  );
}

const mapToDispatch = (dispatch: any) => ({
  currentErd: (action: any) => dispatch(assignCurrentErd(action)),
});

export default connect(null, mapToDispatch)(GenerateVuerd);
