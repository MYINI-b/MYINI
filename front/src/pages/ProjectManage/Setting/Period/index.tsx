import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import './style.scss';

interface Props {
  store: any;
}

export default function ProjectPeriod({ store }: Props) {
  const [isStartCalOpen, setIsStartCalOpen] = useState(false);
  const [isEndCalOpen, setIsEndCalOpen] = useState(false);

  const onDayChange = useCallback(
    (val: any, isStart: boolean) => {
      const momentVal = moment(val);
      if (isStart) {
        const momentEnd = moment(store.pjt.endDay);
        if (momentEnd.isBefore(momentVal))
          store.pjt.endDay = momentVal.format('YYYY/MM/DD');

        store.pjt.startDay = momentVal.format('YYYY/MM/DD');
        setIsStartCalOpen(false);
      } else {
        const momentStart = moment(store.pjt.startDay);
        if (momentVal.isBefore(momentStart))
          store.pjt.startDay = momentVal.format('YYYY/MM/DD');

        store.pjt.endDay = momentVal.format('YYYY/MM/DD');
        setIsEndCalOpen(false);
      }
    },
    [store],
  );

  return (
    <div className="project-period">
      <div className="project-detail-title-wrapper">
        <div className="project-detail-info-title">프로젝트 기간</div>
      </div>
      <article className="project-date-article">
        <div
          className="project-date-box"
          onClick={() => {
            setIsStartCalOpen((prev) => !prev);
            setIsEndCalOpen(false);
          }}
        >
          {store.pjt.startDay || moment(new Date()).format('YYYY/MM/DD')}
          {isStartCalOpen && (
            <div
              className="date-absolute-div"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                value={
                  store.pjt.startDay ? new Date(store.pjt.startDay) : new Date()
                }
                onChange={(val: any) => onDayChange(val, true)}
              />
            </div>
          )}
        </div>
        &nbsp;&nbsp;~ &nbsp;&nbsp;
        <div
          className="project-date-box"
          onClick={() => {
            setIsEndCalOpen((prev) => !prev);
            setIsStartCalOpen(false);
          }}
        >
          {store.pjt.endDay || moment(new Date()).format('YYYY/MM/DD')}
          {isEndCalOpen && (
            <div
              className="date-absolute-div"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                value={
                  store.pjt.endDay ? new Date(store.pjt.endDay) : new Date()
                }
                onChange={(val: any) => onDayChange(val, false)}
              />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
