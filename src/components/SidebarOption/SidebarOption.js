import React from 'react';
import './SidebarOption.css'

const SidebarOption = ({ title, Icon }) => {
  return (
    <div className='sidebar__option'>
      {Icon && <Icon className='sidebar__option-icon' />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
};

export default SidebarOption;
