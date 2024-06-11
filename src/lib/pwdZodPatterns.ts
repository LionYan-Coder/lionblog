import { z } from 'zod';

const MIN_LENGTH = 8;
const FIELD_VALIDATION = {
	TEST: {
		SPECIAL_CHAR: (value: string) =>
			/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value),
		LOWERCASE: (value: string) => /[a-z]/.test(value),
		UPPERCASE: (value: string) => /[A-Z]/.test(value),
		NUMBER: (value: string) => /.*[0-9].*/.test(value)
	},
	MSG: {
		MIN_LEN: `你的密码必须包含 ${MIN_LENGTH} 个或者更多字符`,
		SPECIAL_CHAR: `密码至少包含 1 个特殊字符 ( !@#$%^&*()_-+={[}]|:;"'<,>. )`,
		LOWERCASE: '密码至少包含 1 个小写字符',
		UPPERCASE: '密码至少包含 1 个大写字符',
		NUMBER: '密码至少有 1 个数字'
	}
};

export const pwdZodPatterns = z
	.string()
	.min(MIN_LENGTH, {
		message: FIELD_VALIDATION.MSG.MIN_LEN
	})
	.refine(FIELD_VALIDATION.TEST.SPECIAL_CHAR, FIELD_VALIDATION.MSG.SPECIAL_CHAR)
	.refine(FIELD_VALIDATION.TEST.LOWERCASE, FIELD_VALIDATION.MSG.LOWERCASE)
	.refine(FIELD_VALIDATION.TEST.UPPERCASE, FIELD_VALIDATION.MSG.UPPERCASE)
	.refine(FIELD_VALIDATION.TEST.NUMBER, FIELD_VALIDATION.MSG.NUMBER);
