export const PageOfTotal = (props: { total: number; current: number }) => {
	return (
		<div className="page-total">
			<span className="page-number">{props.current}</span>
			<span className="page-of-total">of</span>
			<span className="total-number">{props.total}</span>
		</div>
	);
};
