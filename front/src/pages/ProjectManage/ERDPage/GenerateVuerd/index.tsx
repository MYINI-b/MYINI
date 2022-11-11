/* eslint-disable no-console */
/* eslint-disable object-shorthand */
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AWS from 'aws-sdk';
import { connect } from 'react-redux';
import './style.scss';
import { getApi } from 'api';

// 3rd party
import 'vuerd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';

import { assignCurrentErd } from 'modules/vuerd';
import axios from 'axios';

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
  }, []);

  useEffect(() => {
    // const getProjectJson: any = `https://myini.s3.ap-northeast-2.amazonaws.com/ERD/${pid}.myini.json`;
    // // 다운로드 방식
    // const importJsonFromS3 = () => {
    //   fetch(getProjectJson, { method: 'GET' })
    //     .then((res) => {
    //       return res.blob(); // raw 데이터를 받아온다
    //     })
    //     .then((blob) => {
    //       const url = window.URL.createObjectURL(blob); // 받아온 날 상태의 data를 현재 window에서만 사용하는 url로 바꾼다
    //       const a = document.createElement('a');
    //       a.href = url;
    //       document.body.appendChild(a);
    //       a.click(); // 자동으로 눌러버리기
    //       setTimeout((_) => {
    //         window.URL.revokeObjectURL(url); // 해당 url을 더 사용 못하게 날려버린다
    //       }, 60000);
    //       a.remove(); // a를 다 사용했으니 지워준다
    //     })
    //     .catch((err) => {
    //       console.error('err: ', err);
    //     });
    // };
    // importJsonFromS3();
  }, []);

  const generateVuerd = () => {
    // vuerd import
    const container: any = document.querySelector('#app-erd');
    let editor: any;

    // const obj: any = {
    //   editor: erdDiv.current.children.item(0),
    // };
    // if (obj.editor) {
    //   // 프로젝트 렌더
    //   const getJson: any = async () =>
    //     getApi(`/erds/erdjson/${pid}`)
    //       .then((res: any) => {
    //         console.log(res, 'res');
    //         obj.editor.context.store.canvasState = res.data.canvas;
    //         obj.editor.context.store.memoState = res.data.memo;
    //         obj.editor.context.store.tableState = res.data.table;
    //         obj.editor.context.store.relationshipState = res.data.realationship;
    //         console.log(obj, 'obj2');
    //         console.log(res, 'res');
    //       })
    //       .catch((err: any) => {
    //         console.log(err, '새로운 프로젝트입니다.');
    //       });
    //   getJson();
    // }

    if (container?.children.item(0)) {
      container.removeChild(container.children.item(0));
      editor = document.createElement('erd-editor');
    } else editor = document.createElement('erd-editor');

    container?.appendChild(editor);
    const payload = {
      editor: editor,
    };
    setCurrentErd(payload);

    const dummyTable = {
      name: 'project',
      comment: '',
      columns: [
        {
          name: 'project_id',
          comment: '',
          dataType: 'BIGINT',
          default: '',
          option: {
            autoIncrement: false,
            primaryKey: true,
            unique: false,
            notNull: true,
          },
          ui: {
            active: false,
            pk: true,
            fk: false,
            pfk: false,
            widthName: 60,
            widthComment: 60,
            widthDataType: 60,
            widthDefault: 60,
          },
          id: '271a0c33-39bc-4631-a816-b5cddc297315',
        },
      ],
    };
    console.log(dummyTable, 'dummy');
    // payload.editor.context.store.tableState = dummyTable;
    console.log(payload.editor.context.store.tableState.tables, 'pay');
    payload.editor.context.store.tableState.tables = dummyTable;
    console.log(payload.editor.context.store.tableState.tables, 'after');

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
    // const saveCurrentErd = obj.editor.context.store;

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
