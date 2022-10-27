/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';

const data = {
  accordion: [
    {
      question: 'Who I am ?',
      answer:
        'I am a Muslim, with an Arabic tongue, of Egyptian birth and of Nubian origins',
    },
    {
      question: 'What I do ?',
      answer: 'I am currently learning to code and study Islam',
    },
    {
      question: 'What I want to do ?',
      answer: 'I want to work as Freelance Web Developer or Frontend Developer',
    },
    {
      question: 'Why you should hire me ?',
      answer: 'Because',
    },
    {
      question: 'question5',
      answer: 'answer5',
    },
  ],
};

interface DataProps {
  accordion: {
    question: string;
    answer: string;
  }[];
}

const Accordion: React.FC = () => {
  const { accordion } = data as DataProps;
  const [questionNum, setQuestionNum] = useState<number>(-1);

  const showAnswer = (index: number): void => {
    if (questionNum === index) {
      setQuestionNum(-1);
      return;
    }
    setQuestionNum(index);
  };

  return (
    <div>
      {accordion.map((item, index) => (
        <div
          key={index}
          className="question__card"
          onClick={() => showAnswer(index)}
        >
          <div className="question__heading">
            <h3>{item.question}</h3>
            {/* {questionNum === index ? <IoIosArrowUp /> : <IoIosArrowDown />} */}
          </div>
          <p className={`question__body ${questionNum === index && 'active'}`}>
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
};
export default Accordion;
