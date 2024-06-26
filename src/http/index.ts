import { Authorization, ContentType } from '~/config/constants';
import { EContentType, EResponseType } from '~/config/enum';
import useHttp from './useHttp';

export type THttpMethod = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH';

export interface IHttpOptions<P = Record<string, any>> {
	data?: P | FormData | BodyInit;
	params?: P;
	responseType?: EResponseType;
	headers?: HeadersInit;
	fetchInit?: RequestInit;
	requestInit?: RequestInit;
}

export async function http<T = any, P = Record<string, any>>(
	url: string,
	method: THttpMethod = 'GET',
	{ responseType = EResponseType.json, ...rest }: IHttpOptions<P> = {}
): Promise<BaseResponse<T>> {
	const baseUrl = process.env.API_URL + url;
	const paramsUrl = rest.params ? formatUrlParams(rest.params) : '';
	const request = new Request(
		paramsUrl ? baseUrl + '?' + paramsUrl : baseUrl,
		rest.requestInit
	);

	const headers: HeadersInit = {
		[ContentType]: EContentType.JSON,
		...rest.headers
	};

	let body: RequestInit['body'] = rest.data as BodyInit;

	if ((headers as Record<string, string>)[ContentType] === EContentType.JSON) {
		body = JSON.stringify(rest.data);
	}
	return fetch(request, {
		method,
		headers,
		body,
		...rest.fetchInit
	})
		.then((res) => {
			if (res.ok) {
				return res[responseType]();
			} else {
				return Promise.reject(res);
			}
		})
		.catch((err) => {
			return Promise.reject(err);
		});
}

export function formatUrlParams(params: IHttpOptions['params']) {
	if (params && Object.keys(params).length > 0) {
		let str = '';
		for (const key in params) {
			str += `${key}=${params[key]}&`;
		}
		return str;
	} else {
		return '';
	}
}
export { useHttp };
export default http;
