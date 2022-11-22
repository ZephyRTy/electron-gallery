import React from 'react';
import { Store } from 'syill';
import { EpubMark, LineSelectionPosition } from '../types/global';
import { DataOperator } from './data/DataOperator';
export const ImageStateStore = {
	states: [] as React.Dispatch<React.SetStateAction<boolean>>[],
	setState: (state: React.Dispatch<React.SetStateAction<boolean>>) => {
		ImageStateStore.states.push(state);
	},
	upgradeState: () => {
		ImageStateStore.states.forEach((state) => state((v: boolean) => !v));
	},
	clear() {
		ImageStateStore.states = [];
	}
};

export const fileDropVisibleStore = new Store(false);
export const dirMapVisibleStore = new Store(false);
export const renameVisibleStore = new Store(false);
export const configVisibleStore = new Store(false);
export const RegInputVisibleStore = new Store(false);
export const dialogActive = {
	active: false,
	setActive: (active: boolean) => {
		dialogActive.active = active;
	},
	reverse: () => {
		dialogActive.active = !dialogActive.active;
	}
};

export const imageStateStore = { current: '' };
export const currentOperator: { op: DataOperator<any, any, any> | null } = {
	op: null
};

export const findStore = new Store(false);
export const cursorStore = new Store(
	[] as { top: number; offset: number; width: number }[]
);
export const catalogShowStore = new Store(false);
export const marksShowStore = new Store(false);
export const changedAlertStore = new Store(false);
export const selectionStore = new Store([] as LineSelectionPosition[][]);
export const tocStore = new Store([] as EpubMark[]);
export const percentageStore = new Store(0);
export const commentVisStore = new Store(false);
