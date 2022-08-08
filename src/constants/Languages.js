const values = {
	"c++17": {
		display: "C++17",
		defaultCode: "#include <bits/stdc++.h>\n\nusing namespace std;\n\nint main() {\n\tcout << \"Hello, World\";\n}\n"
	},
	"python3": {
		display: "Python3",
		defaultCode: "print(\"Hello, World\")"
	},
	"java17": {
		display: "Java17",
		defaultCode: "java 기본 코드"
	},
};

// let cache = {};
// for (let k of Object.keys(values)) {
// 	cache[values[k]] = k;
// }

const toDisplayText = lang => values[lang].display;
// const fromDisplayText = displayText => cache[displayText];

export default {toDisplayText/*, fromDisplayText*/, values};
