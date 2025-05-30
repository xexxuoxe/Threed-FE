import styles from './pagination.module.scss';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange
}) => {
	const getPageNumbers = () => {
		const delta = 2;
		const range = [];
		const start = Math.max(1, currentPage - delta);
		const end = Math.min(totalPages, currentPage + delta);

		for (let i = start; i <= end; i++) {
			range.push(i);
		}
		return range;
	};

	const pageNumbers = getPageNumbers();

	return (
		<div className={styles.pagination_area}>
			<ul>
				<li
					role='button'
					onClick={() => onPageChange(1)}
					aria-disabled={currentPage === 1}
				>
					<i className={styles.ico_double_prev}></i>
				</li>
				<li
					role='button'
					onClick={() => onPageChange(Math.max(1, currentPage - 1))}
					aria-disabled={currentPage === 1}
				>
					<i className={styles.ico_prev}></i>
				</li>

				{pageNumbers.map((number) => (
					<li
						key={number}
						className={currentPage === number ? styles.active : ''}
						onClick={() => onPageChange(number)}
					>
						<span>{number}</span>
					</li>
				))}

				<li
					role='button'
					onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
					aria-disabled={currentPage === totalPages}
				>
					<i className={styles.ico_next}></i>
				</li>
				<li
					role='button'
					onClick={() => onPageChange(totalPages)}
					aria-disabled={currentPage === totalPages}
				>
					<i className={styles.ico_double_next}></i>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
