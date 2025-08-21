// src/components/Avatar.tsx
import me from "../assets/avatar/avatar.png";

export default function Avatar() {
  return (
    <div className="justify-self-center md:justify-self-start">
      <div className="size-28 md:size-32 rounded-full ring-1 ring-[var(--border)] overflow-hidden">
        <img
          src={me}
          alt="Profile avatar"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
