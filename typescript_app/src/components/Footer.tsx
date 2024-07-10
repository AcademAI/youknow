import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap ">
      <p className="text-base font-bold text-white">@2024 AcademAI</p>
      <div>
        <Image
          src="/logo.png"
          alt="logo"
          width={47}
          height={44}
          className="object-contain"
        />
        <Link href="https://academai.ru"></Link>
      </div>

      <div className="flex items-center gap-6">
        <Image
          src="./tiktok.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        <Link href="https://vk.com/academai"></Link>
        <Image
          src="./instagram.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        <Link href="https://t.me/academ_ai"></Link>
        <Image
          src="./twitter.svg"
          alt="logo"
          width={19}
          height={19}
          className="object-contain"
        />
        <Link href={"/terms"}></Link>
      </div>
    </footer>
  );
}

export default Footer;
