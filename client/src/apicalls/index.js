import axios from 'axios';

export const apiRequest = async (method, url, payload) => {
	try {
		const response = await axios({
			method,
			url,
			data: payload,
		});
		return response.data;
	} catch (error) {
		return error;
	}
};
