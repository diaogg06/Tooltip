
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Styles from './tooltip.module.css';

const propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.string,
  children: PropTypes.node.isRequired,
};


const Tooltip = ({title, position, children }) => {

  const node = useRef();
  const [isVisible, setState] = useState(false);
  const handleClick = ({ target }) => {
      if (node.current.contains(target)) {
          // inside click
          return;
      }
      // outside click
      setState(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    
    return () => {
        document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className={Styles.container}
        data-testid="tooltip"
        ref={node}
        onClick={() => setState(!isVisible)}
    >
        <div data-testid="tooltip-placeholder">{children}</div>
        {isVisible && (
            <div
                className={cx(Styles.tooltipContent, Styles[position])}
                data-testid="tooltip-content"
            >
                <span className={Styles.arrow}></span>
                {title}
            </div>
        )}
    </div>
);
}

Tooltip.defaultProps = {
  position: 'right',
};

Tooltip.propTypes = propTypes;

export default Tooltip;
