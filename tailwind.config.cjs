/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}', // ✅ Tailwind 클래스가 적용될 파일 경로
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
