import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../helpers/getNumbers';
import { SearchLink } from '../utils/SearchLink/SearchLink';
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';


interface Props {
  total: number
}

const LIMIT = 10;

export const Pagination: FC<Props> = ({total}) => {
  const [pages, setPages] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const lastPage = pages[pages.length - 1];

  if (Number(currentPage) > lastPage) {
    setSearchParams({ page: `${lastPage}` });
  }


  useEffect(() => {
    setPages(getNumbers(total, LIMIT));
  }, [total]);


  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pages.length;
  const prevPage = isFirstPage ? 1 : currentPage - 1;   
  const nextPage = isLastPage ? pages.length : currentPage + 1;  

  return (
    <section className="Pagination">
      <SearchLink
          className={classNames('Pagination__item', {
            'Pagination__item--disabled': isFirstPage,
          })}
        params={{ page: `${prevPage}` }}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </SearchLink>
      <ul className="Pagination__list">
        {pages.map((page) => (
          <li key={page}>
            <SearchLink
              className={classNames('Pagination__item', {
                'Pagination__item--selected': page === currentPage,
              })}
              params={{ page: `${page}`, limit: `${LIMIT}` }}
            >
              {page}
            </SearchLink>
          </li>
        ))}
      </ul>
      <SearchLink
        className={classNames('Pagination__item', {
          'Pagination__item--disabled': isLastPage,
        })}
        params={{ page: `${nextPage}` }}
      >
        <FontAwesomeIcon icon={faAnglesRight} style={{color: "#1f2937",}} />
      </SearchLink>
      
    </section>
  );
};