function Logo({ text_color = "black" }) {
  return (
    <div className="flex items-center justify-center gap-2 w-min">
      <svg
        viewBox="0 0 24 24"
        className="hidden tab:block w-10"
        fill="white"
      >
        <path d="M18 11c0-.959-.68-1.761-1.581-1.954C16.779 8.445 17 7.75 17 7c0-2.206-1.794-4-4-4-1.517 0-2.821.857-3.5 2.104C8.821 3.857 7.517 3 6 3 3.794 3 2 4.794 2 7c0 .902.312 1.727.817 2.396A1.994 1.994 0 002 11v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-2.638l4 2v-7l-4 2V11zm-5-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM6 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM4 19v-8h12l.002 8H4z" />
      </svg>
      <h1 className={`text-3xl tab:text-2xl font-bold text-${text_color}`}>MOVIE</h1>
    </div>
  );
}

export default Logo;
