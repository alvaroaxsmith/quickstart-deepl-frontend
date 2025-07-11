/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6', // blue-600
        'primary-hover': '#2563EB', // blue-700
        'primary-accent': '#60A5FA', // blue-400
        'secondary-background': '#1F2937', // gray-800
        'background': '#111827', // gray-900
        'text-primary': '#F9FAFB', // gray-100
        'text-secondary': '#9CA3AF', // gray-400
        'border-color': '#374151', // gray-700
        'success-bg': '#10B981', // green-500
        'success-text': '#D1FAE5', // green-100
        'error-bg': '#EF4444', // red-500
        'error-text': '#FECACA', // red-200
      }
    },
  },
  plugins: [],
}
