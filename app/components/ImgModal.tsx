export function ImgModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative h-150 w-300 backdrop-blur-[2px] bg-theme-white 
      shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.08)] rounded-xl"
      ></div>
    </div>
  );
}
