export default function Avatar({ width }) {
  return (
    <div className="avatar">
      <div
        className={`${
          width ? `w-${width} h-${width}` : "w-10 h-10"
        } rounded-full `}
      >
        <img src="https://www.pngitem.com/pimgs/m/466-4660076_unknown-person-hd-png-download.png" />
      </div>
    </div>
  );
}
