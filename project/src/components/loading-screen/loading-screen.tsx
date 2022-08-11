import { Fragment } from 'react';

function LoadingScreen(): JSX.Element {
  return (
    <Fragment>
      <style>{`
        .loading-block {
          margin-top: 180px;
          margin-bottom: 180px;
          text-align: center;

        }
      `}
      </style>
      <div className="loading-block"><h2>Loading ...</h2></div>
    </Fragment>
  );
}

export default LoadingScreen;
