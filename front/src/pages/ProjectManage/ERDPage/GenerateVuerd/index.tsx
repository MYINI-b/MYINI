/* eslint-disable object-shorthand */
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AWS from 'aws-sdk';
import { connect } from 'react-redux';
import './style.scss';

// 3rd party
import 'vuerd';

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

function GenerateVuerd(props: any) {
  const erdDiv = useRef() as React.MutableRefObject<HTMLDivElement>;
  // const { erdData } = props;
  // const { onCurrentErd } = props;
  const { pid } = useParams();
  const [currentErd, setCurrentErd] = useState<any>({});
  const [jsonToS3, setJsonToS3] = useState<any>({});
  // const { erdName } = props;

  useLayoutEffect(() => {
    generateVuerd();
    // console.log(currentErd, '변경감지????');
  }, []);

  // useEffect(() => {
  //   console.log(currentErd, '변경감지????');
  // }, [currentErd]);

  const generateVuerd = () => {
    // vuerd import
    const container: any = document.querySelector('#app-erd');
    let editor: any;
    if (container?.children.item(0)) {
      container.removeChild(container.children.item(0));
      editor = document.createElement('erd-editor');
    } else editor = document.createElement('erd-editor');

    container?.appendChild(editor);
    const payload = {
      editor: editor,
    };
    // console.log(payload.editor.context.store, 'payload');
    setCurrentErd(payload);

    // editor.initLoadJson(erdData);

    window.addEventListener('resize', () => {
      editor.width = window.innerWidth * 0.96;
      editor.height = window.innerHeight;
    });
    window.dispatchEvent(new Event('resize'));
  };

  const saveBtn = () => {
    const obj: any = {
      editor: erdDiv.current.children.item(0),
    };
    const saveCurrentErd = obj.editor.context.store;
    console.log(saveCurrentErd);

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
    console.log(combinedState, 'com');
    // const canvas = JSON.stringify(isCanvasState);
    // const memo = JSON.stringify(isMemoState);
    // const table = JSON.stringify(isTableState);
    // const relationship = JSON.stringify(isRelationshipState);
    const stateToJson = JSON.stringify(combinedState);
    console.log(stateToJson, '?');

    // fileName
    const fileName = `${pid}.myini.json`;

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
        sssss
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
