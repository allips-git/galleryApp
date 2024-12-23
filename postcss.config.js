module.exports = {
  plugins: {
    require('tailwindcss')('./tailwind.config.js'), // Tailwind CSS 설정 파일 경로
    require('autoprefixer'), // Autoprefixer 플러그인
  },
};
