import SignOut from "@/components/sign-out";
import requireUser from "@/lib/hook";

export default async function Dashboard() {
    const session = await requireUser();
    return <div>
        <SignOut/>
    </div>
}