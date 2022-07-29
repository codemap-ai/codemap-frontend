const values = {
	"c++17": "C++17",
	"python3": "Python3",
	"java17": "Java17"
};

let cache = {};
for (let k of Object.keys(values)) {
	cache[values[k]] = k;
}

const toDisplayText = lang => values[lang];
const fromDisplayText = displayText => cache[displayText];

export default {toDisplayText, fromDisplayText, values};
