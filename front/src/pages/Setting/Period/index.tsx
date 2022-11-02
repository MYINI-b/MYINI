import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

export function ProjectPeriod(props: any) {
  const [isStartCalOpen, setIsStartCalOpen] = useState(false);
  const [isEndCalOpen, setIsEndCalOpen] = useState(false);
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());
  const [startDayText, setStartDayText] = useState('');
  const [endDayText, setEndDayText] = useState('');
  const { period } = props;

  const onDayChange = useCallback(
    (val: any, isStart: boolean) => {
      const momentVal = moment(val);
      const momentStart = moment(startDay);
      const momentEnd = moment(endDay);

      if (isStart) {
        setStartDay(val);
        if (momentEnd.isBefore(momentVal)) setEndDay(val);
        setIsStartCalOpen(false);
      } else {
        setEndDay(val);
        if (momentVal.isBefore(momentStart)) setStartDay(val);
        setIsEndCalOpen(false);
      }
    },
    [setStartDay, setEndDay],
  );

  useEffect(() => {
    const newStartDay = moment(startDay).format('YYYY/MM/DD');
    const newEndDay = moment(endDay).format('YYYY/MM/DD');
    setStartDayText(newStartDay);
    setEndDayText(newEndDay);
  }, [startDay, endDay]);

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
          {startDayText}
          {isStartCalOpen && (
            <div
              className="date-absolute-div"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                value={startDay}
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
          {endDayText}
          {isEndCalOpen && (
            <div
              className="date-absolute-div"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                value={endDay}
                onChange={(val: any) => onDayChange(val, false)}
              />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
