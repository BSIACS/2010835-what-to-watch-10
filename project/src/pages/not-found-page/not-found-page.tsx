import React, { Fragment } from 'react';

function NotFoundPage() : JSX.Element{

  return (
    <Fragment>
      <style>
        {`
          .not-found-block{
            margin: 60px 0px 0px 60px;
            font-size: 20px;
          }
        `}
      </style>
      <div className='not-found-block'>
        <h1>{'404 Page not found:('}</h1>
      </div>
    </Fragment>
  );
}

export default NotFoundPage;
