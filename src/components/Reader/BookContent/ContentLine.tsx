import { useContext, useRef } from 'react';
import { lineHeight } from '../../../types/constant';
import { TextLine } from '../../../types/global';
import { TextContext } from './TextContent';

export const ContentLine = (props: { line: TextLine }) => {
	const para = useRef<HTMLParagraphElement>(null);
	const book = useContext(TextContext);
	return (
		<p
			className={props.line.className.join(' ')}
			onMouseDown={(e) => {
				e.stopPropagation();
				book.removeAllRange();
				props.line.parent.setSelection('anchorIndex', props.line.index);
				props.line.parent.setMousePosition(
					e.clientX,
					props.line.index * lineHeight ?? e.clientY
				);
				props.line.parent.showFloatMenu(false);
			}}
			onMouseUp={(e) => {
				e.stopPropagation();
				const selection = window.getSelection();
				if (selection) {
					if (
						(selection.anchorNode === selection.focusNode &&
							selection.anchorOffset === selection.focusOffset) ||
						!selection.anchorNode
					) {
						props.line.parent.clearSelection();
						props.line.parent.clearMousePosition();
						return;
					}
					props.line.parent.setSelection(
						'focusIndex',
						props.line.index
					);
					props.line.parent.setSelection(
						'focusOffset',
						selection.focusOffset
					);
					props.line.parent.setSelection(
						'anchorOffset',
						selection.anchorOffset
					);
					props.line.parent.confirmAndFixSelection();
					props.line.parent.showFloatMenu(true);
				} else {
					props.line.parent.clearSelection();
					props.line.parent.clearMousePosition();
					return;
				}
			}}
			ref={para}
		>
			{props.line.content}
		</p>
	);
};
