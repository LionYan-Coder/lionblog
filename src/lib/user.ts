type NameHelperParams = {
	firstName?: string | null;
	lastName?: string | null;
	name?: string | null;
};

export const getFullName = ({ firstName, lastName, name }: NameHelperParams) =>
	name || [firstName, lastName].join(' ').trim() || '';
