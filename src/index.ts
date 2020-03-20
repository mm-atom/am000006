import am1 from '@mmstudio/am000001';
import am3 from '@mmstudio/am000003';

export default async function nodejs<T>(mm: am1, service: string, msg: unknown) {
	const body = JSON.stringify(msg);
	const url = `${am3(mm, 'host')}/sendmessage/${encodeURIComponent(service)}`;
	const ret = await fetch(url, {
		body,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'mm-mobile'
		},
		method: 'POST'
	});
	const status = ret.status;
	if (status > 0 && status < 300) {
		return await ret.json() as T;
	}
	const err_msg = await ret.text();
	console.error(`msg status:${ret.statusText}. detail:${err_msg}`);
	throw new Error(err_msg);
}
