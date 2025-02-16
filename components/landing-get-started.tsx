

import { ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function GetStartedButton() {
    return <div>
        <form action={ async () => {
            "use server"
            const session = await auth();
            if(session?.user){
                redirect('/questionnarie');
            }
            else{
                redirect('/login');
            }
        }}>
            <Button size="lg" className="bg-primary hover:bg-primary/80 transition-colors">
                Get Started <ArrowRight className="ml-2" />
            </Button>
        </form>
    </div>
}