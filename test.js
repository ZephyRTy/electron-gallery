const stringfy = (obj) => {
	let str = '{';
	for (let key in obj) {
		if (typeof obj[key] === 'object') {
			str += `${key}: ${stringfy(obj[key])},`;
		} else {
			str += `${key}: ${obj[key]},`;
		}
	}
	str = str.slice(0, -1);
	str += '}';
	return str;
};

console.log(stringfy({ a: 1, b: { c: 2, d: 3 } }));
