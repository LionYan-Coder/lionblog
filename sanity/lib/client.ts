import { apiVersion, dataset, projectId, useCdn } from '../env';
import { createClient } from '@sanity/client';

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn,
	token: process.env.SANITY_API_WRITE_TOKEN
});
