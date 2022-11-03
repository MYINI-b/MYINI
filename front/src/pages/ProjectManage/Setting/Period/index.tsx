import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import './style.scss';

interface Props {
  startDay: string;
  setStartDay: React.Dispatch<React.SetStateAction<string>>;
  endDay: string;
  setEndDay: React.Dispatch<React.SetStateAction<string>>;
  store: any;
}

export default function ProjectPeriod({
  startDay,
  setStartDay,
  endDay,
  setEndDay,
  store,
}: Props) {
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

  useEffect(() => {
    const startDayMoment = moment(store.pjt.startDay);
    const endDayMoment = moment(store.pjt.endDay);

    const newStartDay = startDayMoment.format('YYYY/MM/DD');
    const newEndDay = endDayMoment.format('YYYY/MM/DD');
    setStartDay(newStartDay);
    setEndDay(newEndDay);
  }, [store.pjt.startDay, store.pjt.endDay]);

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
          {startDay}
          {isStartCalOpen && (
            <div
              className="date-absolute-div"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                value={new Date(startDay)}
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
          {endDay}
          {isEndCalOpen && (
            <div
              className="date-absolute-div"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                value={new Date(endDay)}
                onChange={(val: any) => onDayChange(val, false)}
              />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
