export default function AvatarProfile({ src, alt }) {
  return <img src={src} alt={alt} className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-md" />;
}
