import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center gap-10">
            <h1>TalkCore tawk</h1>
            <Link href="/login">Login</Link>
            <Link href="/register">Sign Up</Link>
        </main>
    );
}
