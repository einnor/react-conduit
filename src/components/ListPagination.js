import React from 'react';
import PropTypes from 'prop-types';

const ListPagination = (props) => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); i += 1) {
    range.push(i);
  }

  const setPage = page => props.onSetPage(page);

  return (
    <ul className="pagination">
      {
        range.map((v) => {
          const isCurrent = v === props.currentPage;
          const onClick = (ev) => {
            ev.preventDefault();
            setPage(v);
          };

          return (
            <li
              className={isCurrent ? 'page-item active' : 'page-item'}
              key={v.toString()}
              tabIndex={0}
              onKeyPress={null}
              role="button"
              onClick={onClick}
            >
              <span className="page-link">
                {v + 1}
              </span>
            </li>
          );
        })
      }
    </ul>
  );
};

ListPagination.propTypes = {
  articlesCount: PropTypes.number.isRequired,
  onSetPage: PropTypes.func.isRequired,
  currentPage: PropTypes.bool.isRequired,
};

export default ListPagination;
