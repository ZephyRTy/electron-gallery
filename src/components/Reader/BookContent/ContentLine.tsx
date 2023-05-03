import { useContext, useRef } from 'react';
import { lineHeight } from '../../../types/constant';
import { TextLine } from '../../../types/global';
import { TextContext } from './TextContent';

export const ContentLine = (props: { line: TextLine }) => {
	const para = useRef<HTMLParagraphElement>(null);
	const book = useContext(TextContext);
	const selectionManager = book?.selectionManager;
	return (
		<p
			className={props.line.className.join(' ')}
			onMouseDown={(e) => {
				e.stopPropagation();
				selectionManager.removeAllRange();
				selectionManager.clearSelection();
				selectionManager
					.setSelection('anchorIndex', props.line.index)
					.setMousePosition(
						e.clientX,
						props.line.index * lineHeight ?? e.clientY
					);
				selectionManager.showFloatMenu(false);
			}}
			onMouseUp={(e) => {
				e.stopPropagation();
				const selection = window.getSelection();
				if (selection) {
					if (selection.isCollapsed) {
						selectionManager.clearSelection();
						selectionManager.clearMousePosition();
						return;
					}
					selectionManager
						.setSelection('focusIndex', props.line.index)
						.setSelection('focusOffset', selection.focusOffset)
						.setSelection('anchorOffset', selection.anchorOffset);
					if (selectionManager.confirmAndFixSelection()) {
						selectionManager.showFloatMenu(true);
					}
				} else {
					selectionManager.clearSelection();
					selectionManager.clearMousePosition();
					return;
				}
			}}
			ref={para}
		>
			{props.line.content}
		</p>
	);
};
