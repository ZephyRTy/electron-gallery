import React from 'react';
import { Store } from 'syill';
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
export const dialogActive = {
	active: false,
	setActive: (active: boolean) => {
		dialogActive.active = active;
	},
	reverse: () => {
		dialogActive.active = !dialogActive.active;
	}
};

export const imageStateStore = new Store('');
