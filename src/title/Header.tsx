import React from 'react';
import './Header.scss';

type IHeaderProps = {title: string, desc: string};

export const Header = (props: IHeaderProps) => (
  <div className="Header">
    <h1 className="title">{props.title}</h1>
    <p className="subtitle"> {props.desc} </p>
  </div>
);

