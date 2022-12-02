export const FirtSignInModal = (props: any) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    // style: "currency",
    currency: "VND",
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return (
    <>
      <div className="text-center text-xl">
        <div>Rất vui được gặp lại, {props.auth.names}</div>
        <div>Ngày mới đến với 1 món quà nhỏ</div>
        <div className="my-10 text-5xl font-extrabold text-green-400">
          + 20.000
        </div>
        <div>
          Số dư hiện tại: {formatter.format(Number(props.authCurrentScore))}
        </div>
      </div>
    </>
  );
};
