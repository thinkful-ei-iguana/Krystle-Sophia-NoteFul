import React from 'react'
import './CircleButton.css'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function NavCircleButton(props) {
  const { tag, type, to, role, className, onClick, children } = props

  const CustomElementName = tag === 'link' ? Link : tag;
  const renderCustomElement = () => {

    // render element as a Link
    if (type && to) {
      return (
        <div className="CircleButtonLink">
          <CustomElementName className={'NavCircleButton ' + className}
            type={type}
            to={to}
          >
            {children}
          </CustomElementName>
        </div>
      )
    }
    
    // render element as a button
    if (onClick && role){
      return (
        <div className="CircleButton">
          <CustomElementName className={'NavCircleButton ' + className}
            onClick={onClick}
            role={role}
          >
            {children}
          </CustomElementName>
        </div>
      )
    }
  }

  return (
    renderCustomElement()
  )
}

NavCircleButton.defaultProps ={
  tag: 'button',
}

NavCircleButton.propTypes = {
  tag: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  type: PropTypes.string,
  to: PropTypes.string,
  role: PropTypes.string,
  onClick: PropTypes.func
};
