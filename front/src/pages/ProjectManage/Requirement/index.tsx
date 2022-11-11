import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { useSyncedStore } from '@syncedstore/react';
import { useEffect } from 'react';

import { RootState } from 'modules';
import { useSelector } from 'react-redux';
import { globalStore } from 'store/yjsStore';
import { getApi } from 'api';
import RowList from './RowList';

export default function Requirement() {
  const { pid } = useSelector((state: RootState) => state.project);
  const store = useSyncedStore(globalStore);

  useEffect(() => {
    const getRequirements = async () => {
      const { data }: any = await getApi(`/requirementdocs/${pid}`);
      console.log(data);
      if (data) {
        const requirementsArray = data.map((req: any) => {
          return {
            id: req.requirementId,
            category: {
              name: req.requirementCategoryDto.categoryName,
              color: req.requirementCategoryDto.categoryColor,
              id: req.requirementCategoryId,
            },
            requirement: req.requirementName ? req.requirementName : '',
            description: req.requirementContent ? req.requirementContent : '',
            division: req.requirementPart ? req.requirementPart : '',
            manager: req.memberNickName ? req.memberNickName : '',
            importance: req.requirementPriority ? req.requirementPriority : 1,
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
    <div className="requirement-container">
      <h1 className="requirement-title">요구사항명세서</h1>

      <section className="requirement-info-section">
        <h3 className="requirement-project-title">PROJECT NAME</h3>
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

        <RowList store={store} />
      </section>
    </div>
  );
}
