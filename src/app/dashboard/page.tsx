import { getCurrentUser } from "@/services/auth";
// import { useRouter } from "next/navigation";


const DeshboardPage = async () => {
    // const router = useRouter();
    const user = await getCurrentUser();
    // if(!user){
    //     router.push('/')
    // }
    // console.log(user);

    return (
        <div>
            welcome {user?.email}
        </div>
    );
};

export default DeshboardPage;