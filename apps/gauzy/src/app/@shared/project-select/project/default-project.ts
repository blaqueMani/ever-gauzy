import { IOrganizationProject, TaskListTypeEnum } from '@leano/contracts';

export const ALL_PROJECT_SELECTED: IOrganizationProject = {
	id: '',
	currency: null,
	billing: null,
	public: true,
	owner: null,
	name: 'All Projects',
	tags: [],
	taskListType: TaskListTypeEnum.GRID
};
