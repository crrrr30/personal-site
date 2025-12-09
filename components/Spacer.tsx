export function Spacer({ w = 0, h = 0 }: { w?: number; h?: number }) {
  return (
    <div
      style={{
        width: w,
        height: h,
      }}
    />
  );
}
