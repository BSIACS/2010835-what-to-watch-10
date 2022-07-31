import { useRef, useState } from 'react';
import { FilmTabs } from '../../constants';
import TabsProps from '../../types/props/tabs-props';
import Details from './details/details';
import Overview from './overview/overview';
import Reviews from './reviews/reviews';

function Tabs({film, comments} : TabsProps) : JSX.Element{
  const overviewTab = <Overview key={FilmTabs.Overview} film={film}/>;
  const detailTab = <Details key={FilmTabs.Details} film={film}/>;
  const reviewTab = <Reviews key={FilmTabs.Reviews} film={film} comments={comments}/>;

  const [activeTabsComponent, setActiveTabsComponent] = useState(overviewTab);

  const overviewSpanElement = useRef<HTMLSpanElement | null>(null);
  const detailsSpanElement = useRef<HTMLSpanElement | null>(null);
  const reviewSpanElement = useRef<HTMLSpanElement | null>(null);

  const tabLinkClickHandler = (evt : React.MouseEvent<HTMLSpanElement>) => {
    switch((evt.target as HTMLSpanElement).dataset['value']){
      case FilmTabs.Overview: setActiveTabsComponent(overviewTab);
        break;
      case FilmTabs.Details: setActiveTabsComponent(detailTab);
        break;
      case FilmTabs.Reviews: setActiveTabsComponent(reviewTab);
        break;
    }
  };


  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${FilmTabs.Overview === activeTabsComponent.key ? 'film-nav__item--active' : ''}`}>
            <span ref={overviewSpanElement} className="film-nav__link" data-value={FilmTabs.Overview} onClick={tabLinkClickHandler} >Overview</span>
          </li>
          <li className={`film-nav__item ${FilmTabs.Details === activeTabsComponent.key ? 'film-nav__item--active' : ''}`}>
            <span ref={detailsSpanElement} className="film-nav__link" data-value={FilmTabs.Details} onClick={tabLinkClickHandler} >Details</span>
          </li>
          <li className={`film-nav__item ${FilmTabs.Reviews === activeTabsComponent.key ? 'film-nav__item--active' : ''}`}>
            <span ref={reviewSpanElement} className="film-nav__link" data-value={FilmTabs.Reviews} onClick={tabLinkClickHandler} >Reviews</span>
          </li>
        </ul>
      </nav>
      {activeTabsComponent}
    </div>
  );
}

export default Tabs;
