export function Button({
  children,
  className,
  type,
  onClick,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 w-[100px] text-lightRose1 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
} 