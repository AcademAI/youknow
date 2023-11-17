import Link from "next/link"

export default function Footer() {
    return (
        <footer className="fixed inset-x-0 bottom-0 bg-white dark:bg-gray-950 z-[10] h-fit border-t border-zinc-300 py-2">
            <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl">
                <ul className="flex items-center space-x-4">
                    <li><Link href="https://vk.com/academai">VK</Link></li>
                    <li><Link href="https://t.me/academ_ai">TG</Link></li>
                    <li><Link href="https://academai.ru">Landing</Link></li>
                    <li><Link href={"/terms"}>Terms & Condition</Link></li>
                </ul>
                <p className="items-center hidden gap-2 sm:flex">
                    @2024 All rights reserved by<Link href="https://academai.ru">AcademAI.</Link>
                </p>
            </div>
        </footer>
    )
}