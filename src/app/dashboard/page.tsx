import { getCurrentUser } from "@/services/auth";


const DeshboardPage =async () => {

    const user = await getCurrentUser();
    console.log(user);

    return (
        <div>
            welcome
        </div>
    );
};

export default DeshboardPage;