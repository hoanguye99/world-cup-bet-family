export const Footer = () => {
  return (
    <div className="container mx-auto ">
      <div className="py-5 mt-16 border-t border-solid border-l-0 border-r-0 border-b-0 border-white/80" />
      <div className="flex gap-y-8 mb-8 flex-col md:flex-row md:justify-between items-center">
        <div className="flex">
          <div className="shrink-0 w-[120px] h-[160px] bg-center bg-no-repeat bg-contain bg-[url('./assets/world-cup-2022-logo.svg')]">
          </div>
          <div className="lg:max-w-sm">
            <p className="mt-8 text-sm text-white/80">
            FPT.EageEye SOC is a digital solution for monitoring, detecting and handling cyber security vulnerabilities 24/7, detecting attacks and intrusions: ransomeware, insider threat, APT.
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm text-white/80 lg:px-3">
          <p className="text-lg font-extrabold tracking-wide text-white/60">
            Top Up Service
          </p>
          <p className="pb-3 tracking-wide text-white ">
            Nguyễn Đình Hoàng
          </p>
          <div className="flex">
            <p className="mr-1 text-white">MOMO:</p>
            <a
              href="tel:850-123-5021"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300"
            >
              086-558-1392
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-white">TPBank:</p>
            <a
              className="transition-colors duration-300"
            >
              0865581392
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between pt-0 sm:pt-7 pb-8  lg:flex-row">
        <div>
        </div>
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
  )
}
