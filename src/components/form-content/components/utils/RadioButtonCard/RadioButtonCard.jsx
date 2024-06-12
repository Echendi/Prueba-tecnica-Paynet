import React from 'react';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import './RadioButtonCard.css';

export default function RadioButtonCard({ children, title, value, checked, onChange }) {
  return (
    <div className={checked ? 'rc-checked' : 'rc'} onClick={() => onChange(title)}>
      {checked ? (
        <CheckCircleIcon className="rc-check" />
      ) : (
        <RadioButtonUncheckedIcon className="rc-check" />
      )}
      <div className='rc-info'>
        <div className='rc-icon'>
          {children}
        </div>
        <p>{title}</p>
      </div>
      <input
        type="radio"
        name="radioGroup"
        id={title}
        className='rc-input'
        value={value}
        checked={checked}
        onChange={() => onChange(title)}
        style={{ display: 'none' }}
      />
    </div>
  );
}