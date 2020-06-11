import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

interface OwnProps {
  title: string;
}

type Props = OwnProps;

const Navbar: React.FunctionComponent<Props> = (props: Props) => {
  const {title} = props;
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-item content">
          <span className={'is-size-5-desktop has-text-weight-bold'}>
            {title}
          </span>
        </div>
      </div>
      <div className="navbar-menu">
        <div className={'navbar-end'}>
          <a href={'https://less.coffee'} className={'navbar-item'}>
            less.coffee
            <span className={'icon is-medium fas'}>
              <FontAwesomeIcon icon={faExternalLinkAlt}/>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
