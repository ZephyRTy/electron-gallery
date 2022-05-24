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

export const visibleStore = new Store(false);
