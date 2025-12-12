export function Spacer({ w = 0, h = 0 }: { w?: number; h?: number }) {
  return (
    <div
      style={{
        width: w !== 0 ? `${w}rem` : undefined,
        height: h !== 0 ? `${h}rem` : undefined,
      }}
    />
  );
}
