"use client";
import { Button } from "../ui/button";
import { HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth";


export default function Navbar() {
    const { user, setIsLoading, isLoading } = useUser();
    const router = useRouter();

    const handlelogout = () => {
        logoutUser();
        setIsLoading(true);
        router.push("/");
    };

    return (
        <header className="border-b w-full bg-slate-300">
            <div className="container flex justify-between items-center mx-auto h-16 px-3">

                <Link href="/" className="text-2xl font-black flex items-center">
                    Sakhawat
                </Link>

                <nav className="flex gap-2">

                    <Link href="/">
                        <Button variant="outline">
                            <HomeIcon />
                        </Button>
                    </Link>

                    {
                        user ?
                            <>
                                <Link href='/dashboard'>
                                    <Button
                                        variant='outline'
                                        className="rounded-full"
                                    >Dashboard</Button>
                                </Link>

                                <Button
                                    onClick={handlelogout}
                                    disabled={isLoading}
                                    variant='outline'
                                    className="mx-auto flex items-center"
                                >
                                    <LogOutIcon />LogOut
                                </Button>
                            </>
                            :
                            <Link href='/login'>
                                <Button
                                    disabled={isLoading}
                                    variant='outline'
                                    className="flex items-center"
                                ><LogInIcon /> Login</Button>
                            </Link>
                    }



                </nav>
            </div>
        </header>
    );
}