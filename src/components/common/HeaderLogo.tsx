import LogoColor from '@/assets/logo-color.svg';
import Image from 'next/image';

const logoRed = LogoColor;

export default function HeaderLogo() {
  return (
    <div className="hidden sm:block relative h-[90%] w-32 overflow-hidden ml-0">
    <Image
      src={logoRed}
      alt="logo"
      fill
      style={{ objectFit: 'cover' }}
      className="clip-path-custom"
    />
  </div>
  );
}