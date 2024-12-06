

import React from 'react';

import UserBox from '../sidebar/user-box';

interface HeaderBoxProps {
  title: string;
  name?: string;
  type?: string;
  subTitle?: string;
}

const HeaderBox = ({
  title,
  subTitle,
  type = 'title',
  name,
}: HeaderBoxProps) => {
  return (
    <div className="flex  items-center justify-between ">
      <div className="flex flex-col ">
        <h1 className="sm:h2-semibold h3-semibold text-primary-default">
          {title}
          {type === 'greeting' && (
            <span className="text-primary-default">&nbsp;{name}</span>
          )}
        </h1>
        <p className="sm:p-regular small-regular text-grey-400">
          {subTitle}
        </p>
      </div>

      <UserBox/>
    </div>
  );
};

export default HeaderBox;
