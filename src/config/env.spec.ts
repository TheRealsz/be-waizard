import { validateEnv } from './env';

const validEnv = {
    PORT: '3000',
    DATABASE_URL: "file:./dev.db"
};

describe('validateEnv', () => {
    it('parses a complete environment', () => {
        expect(validateEnv(validEnv)).toMatchObject({ PORT: 3000 });
    });

    it('defaults PORT to 3000', () => {
        const env: Record<string, unknown> = { ...validEnv };
        delete env.PORT;
        expect(validateEnv(env).PORT).toBe(3000);
    });

    it.each(Object.keys(validEnv).filter((key) => key !== 'PORT'))(
        'fails when %s is missing',
        (key) => {
            const env: Record<string, unknown> = { ...validEnv };
            delete env[key];
            expect(() => validateEnv(env)).toThrow(key);
        },
    );

    it('never includes variable values in the error message', () => {
        const env = {
            ...validEnv,
            DATABASE_URL: '',
        };

        let message = '';
        try {
            validateEnv(env);
        } catch (error) {
            message = (error as Error).message;
        }

        expect(message).toContain('DATABASE_URL');
    });
});
