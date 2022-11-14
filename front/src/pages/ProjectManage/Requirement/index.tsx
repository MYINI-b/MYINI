import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useCallback } from 'react';
import { useOthers, useUpdatePresence } from '@y-presence/react';
import { UserPresence } from 'types/main';

import { getApi } from 'api';
import { Cursor } from 'components/Cursor';
import RowList from './RowList';

interface Props {
  pid: string;
  store: any;
}
export default function Requirement({ pid, store }: Props) {
  const others = useOthers<UserPresence>();
  const updatePresence = useUpdatePresence<UserPresence>();

  const handlePointMove = useCallback(
    (e: React.PointerEvent) => {
      updatePresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    },
    [updatePresence],
  );

  useEffect(() => {
    const getRequirements = async () => {
      const { data }: any = await getApi(`/requirementdocs/${pid}`);
      console.log(data);
      if (data) {
        const requirementsArray = data.map((req: any) => {
          return {
            id: req.requirementId,
            category: req.requirementCategoryDto
              ? {
                  name: req.requirementCategoryDto.categoryName,
                  color: req.requirementCategoryDto.categoryColor,
                  id: req.requirementCategoryId,
                }
              : { name: '', color: '', id: 0 },
            requirement: req.requirementName ? req.requirementName : '',
            description: req.requirementContent ? req.requirementContent : '',
            division: req.requirementPart ? req.requirementPart : '',
            manager: req.memberNickName ? req.memberNickName : '',
            importance: req.requirementPriority ? req.requirementPriority : 3,
            point: req.requirementStoryPoint ? req.requirementStoryPoint : 0,
          };
        });
        store.pjt.rows = requirementsArray;

        const categoryListResp: any = await getApi(
          `/requirementdocs/${pid}/categories`,
        );
        store.pjt.categories = categoryListResp.data.map((cat: any) => {
          return {
            name: cat.categoryName,
            color: cat.categoryColor,
            id: cat.requirementCategoryId,
          };
        });
      } else {
        console.log('없는 프젝의 요구사항명세 조회함');
      }
    };

    if (pid !== 'new') getRequirements();
  }, []);
  return (
    <div className="requirement-container" onPointerMove={handlePointMove}>
      <h1 className="requirement-title">요구사항명세서</h1>

      <section className="requirement-info-section">
        <h3 className="requirement-project-title">
          {store && store.pjt.title}
        </h3>
        <button className="requirement-save-button" type="button">
          <FontAwesomeIcon icon={faSave} />
        </button>
      </section>

      <section className="requirement-table-section">
        <article className="table-title-article">
          <h5 className="table-col title one">ID</h5>
          <h5 className="table-col title one-half category-container">
            카테고리
          </h5>
          <h5 className="table-col title one-half">요구사항 명</h5>
          <h5 className="table-col title two">내용</h5>
          <h5 className="table-col title one">구분</h5>
          <h5 className="table-col title one">담당자</h5>
          <h5 className="table-col title one">중요도</h5>
          <h5 className="table-col title one">포인트</h5>
        </article>

        <RowList store={store} pid={pid} />
      </section>
      {others.map((user) => (
        <Cursor key={user.id} {...user.presence} />
      ))}
    </div>
  );
}
