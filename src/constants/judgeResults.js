class JudgeResult {
	color;
	displayText;
	displayScore;
	bold;

	constructor(color, display, displayScore, bold) {
		this.color = color;
		this.displayText = display;
		this.displayScore = displayScore;
		this.bold = bold;
	}
}

export default {
	ACCEPTED: new JudgeResult("#00c853", null, true, true),
	WRONG_ANSWER: new JudgeResult("#ff1744", "오답", true, true),
	TIME_LIMIT_EXCEEDED: new JudgeResult("#ff1744", "시간 초과", true, true),
	MEMORY_LIMIT_EXCEEDED: new JudgeResult("#ff1744", "메모리 초과", true, true),
	RUNTIME_ERROR: new JudgeResult("#ff9100", "런타임 에러", true, true),
	COMPILATION_ERROR: new JudgeResult("#546e7a", "컴파일 에러", false, false),
	INTERNAL_ERROR: new JudgeResult("#a30000", "내부 오류 발생", false, true),
	SUCCESS: new JudgeResult("#000000", "테스트 종료", false, true),
	WAITING: new JudgeResult("#000000", "채점 중", false, false),
};
