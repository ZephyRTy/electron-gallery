/* eslint-disable no-unused-vars */
type Task = (...args: any[]) => Promise<any>;
export const TaskQueueBeforeQuit = {
	queue: new Map<string, Task>(),
	add: (task: Task, id: string) => {
		if (!TaskQueueBeforeQuit.queue.has(id)) {
			TaskQueueBeforeQuit.queue.set(id, task);
		} else {
			throw new Error('Task already exists');
		}
	},
	remove(id: string) {
		if (TaskQueueBeforeQuit.queue.has(id)) {
			TaskQueueBeforeQuit.queue.delete(id);
		} else {
			throw new Error('Task does not exist');
		}
	},
	async run() {
		return await Promise.all(
			[...TaskQueueBeforeQuit.queue.values()].map((task) => task())
		);
	}
};
