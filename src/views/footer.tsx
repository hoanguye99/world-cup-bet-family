export const Footer = () => {
  return (
    <div className="container mx-auto select-text">
      <div className="py-5 mt-16 border-t border-solid border-l-0 border-r-0 border-b-0 border-white/80" />
      <div className="flex gap-y-8 mb-8 flex-col md:flex-row md:justify-between items-center">
        <div className="flex">
          <div className="shrink-0 w-[120px] h-[160px] bg-center bg-no-repeat bg-contain bg-[url('./assets/world-cup-2022-logo.svg')]"></div>
          <div className="lg:max-w-sm">
            <div className="mt-8 text-sm text-white/80">
              {/* Tài chính vững mạnh. Bảo mật tuyệt đối. Cá cược trên tỉ số và kết
              quả thắng thua minh bạch và uy tín. Hãy chơi hết mình nào các bet
              thủ !! */}
              <p>World cup không phải tất cả.</p>
              <p> All mới là tất cả!</p>
              <p>
                {" "}
                All in vào{" "}
                <span className="bg-white select-none">Argentina</span> nào!
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-sm text-white/80 lg:px-3">
          <p className="text-lg font-extrabold tracking-wide text-white/60">
            Top Up Service
          </p>
          <p className="pb-3 tracking-wide text-white ">
            Thủ quỹ Nguyễn Thùy Linh
          </p>
          <div className="flex">
            <p className="mr-1 text-white">Techcombank:</p>
            <a className="transition-colors duration-300">1903 7667 4220 10</a>
          </div>
          <div className="flex">
            <p className="mr-1 text-white">SĐT:</p>
            <a
              href="tel:850-123-5021"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300"
            >
              091-949-6558
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between pt-0 sm:pt-7 pb-8  lg:flex-row">
        <div></div>
        <ul className="flex mb-3 space-x-5 flex-row">
          <li>
            <a
              href="/"
              className="text-sm text-neutral-600 transition-colors duration-300"
            >
              F.A.Q
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-sm text-neutral-600 transition-colors duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-sm text-neutral-600 transition-colors duration-300"
            >
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
