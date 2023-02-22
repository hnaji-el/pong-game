/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#7970B3",
        shape: "#414554",
        body: "#20222B",
        primaryText:"#fff",
        secondaryText: "#81879C",
        online: "#43FF83",
        offline:"#EC6565",
        sideBackground: "#242630",
        backgroundHover:"#41455473",
        time:"rgba(255, 255, 255, 0.39)",
        winBadge:"#C6F6D5",
        loseBadge:"#FED7D7",
        textWinBadge:"#22543D",
        textLoseBadge:"#822727",
        ownerBg:"#E9D8FD",
        ownerText:"#595281",
        adminBg:"#F6E791",
        adminText:"#D98824",
        unblock:"#BC4A58",
        error:"#FF6174"
        
      },
      fontFamily: {
        sans: ['Poppins'],
      },
    },
  },
  plugins: [],
}
