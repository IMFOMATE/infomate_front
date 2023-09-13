import {NavigateBefore, NavigateNext} from "@mui/icons-material";
import styles from './Pagenation.module.css';

function Pagenation({ pageInfo, onPageChange }) {
  const currentPage = pageInfo?.cri.pageNum-1;
  const size = pageInfo?.cri.amount;

  console.log(currentPage)
  const handlePageChange = (pageNum) => {
    if (pageNum >= 0 && pageNum <= pageInfo?.pageEnd-1) {
      onPageChange(pageNum,size);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 0; i < pageInfo?.pageEnd; i++) {
      pageNumbers.push(
          <li
              key={i}
              className={`${styles.page} ${i === currentPage ? styles.active : null}`}
              onClick={() => handlePageChange(i)}
          >
            {i+1}
          </li>
      );
    }

    return pageNumbers;
  };

  if(pageInfo?.pageEnd === 0 ) return ;

  return (
      <div className={styles.page_wrapper}>
        <button
            className={currentPage === 1 ? 'disabled' : ''}
            onClick={() => handlePageChange(currentPage - 1)}
        >
          <NavigateBefore/>
        </button>
        <ul className={styles.ul}>{renderPageNumbers()}</ul>
        <button
            className={currentPage === pageInfo?.pageEnd-1 ? 'disabled' : ''}
            onClick={() => handlePageChange(currentPage + 1)}
        >
          <NavigateNext/>
        </button>
      </div>
  );
}

export default Pagenation;
