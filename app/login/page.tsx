import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, signIn } from "@/lib/auth";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage(){
    const session = await auth();
    if(session?.user){
        redirect("/questionnaire")
    }
    return <div className="min-h-screen flex flex-col gradient-bg">
        <main className="flex-grow flex items-center justify-center p-4">
            <div className="w-full max-w-md">
            <Card className="glass border-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-bold">Welcome back</CardTitle>
              <CardDescription className="text-center">Choose your preferred sign in method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <form action={async() =>{
                    "use server";
                    await signIn("google")
                }}>
                    <Button variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/5 space-x-2 h-12"
                    >
                    Sign in with Google
                    </Button>
                </form>
                <form action={async() =>{
                    "use server";
                    await signIn("github")
                }}>
                    <Button variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/5 space-x-2 h-12"
                    >
                    Sign in with Github
                    </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
        </main>
    </div>
}