/**
 * Shows just the phone from an app screenshot, cropping away the flat background around it.
 * box: the image size and where the phone sits inside it, in image pixels
 *      { width, height, left, top, right, bottom }
 * Size and corner radius come from className (e.g. "w-40 rounded-[18px]").
 */
const PhoneScreen = ({ src, box, alt = '', className = '', style }) => {
  const w = box.right - box.left + 1;
  const h = box.bottom - box.top + 1;
  return (
    <div
      className={`relative overflow-hidden bg-[#111] ${className}`}
      style={{ aspectRatio: `${w} / ${h}`, ...style }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        className="absolute max-w-none select-none"
        style={{
          width: `${(box.width / w) * 100}%`,
          left: `${(-box.left / w) * 100}%`,
          top: `${(-box.top / h) * 100}%`,
        }}
      />
    </div>
  );
};

export default PhoneScreen;
