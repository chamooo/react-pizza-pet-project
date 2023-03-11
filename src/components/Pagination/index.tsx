import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import BsFillArrowRightCircleFill from 'react-icons/bs';
const Pagination = ({onChangePage, pageNumber}:any) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={3}
            forcePage={pageNumber - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
