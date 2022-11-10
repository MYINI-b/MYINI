/* eslint-disable react/display-name */
import { ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import './style.scss';

type RadioButtonProps = {
  title: string;
  name: string;
} & ButtonHTMLAttributes<HTMLInputElement>;

const RadioButton = forwardRef(
  ({ title, ...props }: RadioButtonProps, ref: Ref<HTMLInputElement>) => {
    return (
      <label className="select-label">
        <input ref={ref} {...props} type="radio" />
        <span>{title}</span>
      </label>
    );
  },
);

export default RadioButton;
