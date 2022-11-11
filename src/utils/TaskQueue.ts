/* eslint-disable no-unused-vars */
type Task = (...args: any[]) => Promise<any>;
export const TaskQueue = {
	queue: new Map<string, Task>(),
	add: (task: Task, id: string) => {
		if (!TaskQueue.queue.has(id)) {
			TaskQueue.queue.set(id, task);
		} else {
			throw new Error('Task already exists');
		}
	},
	remove(id: string) {
		if (TaskQueue.queue.has(id)) {
			TaskQueue.queue.delete(id);
		} else {
			throw new Error('Task does not exist');
		}
	},
	async run() {
		return await Promise.all(
			[...TaskQueue.queue.values()].map((task) => task())
		);
	}
};
