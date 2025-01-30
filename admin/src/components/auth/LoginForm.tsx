import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import CardWrapper from "./CardWrapper"
import { z } from "zod"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Link, Navigate } from "react-router"
import { login } from "@/api/auth"
import { useState, useTransition } from "react"
import { FormError } from "../FormError"
import { FormSuccess } from "../FormSuccess"
import { useAuthStore } from "@/store/AuthStore"

const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition()

    const setAccessToken = useAuthStore((state) => state.setAccessToken)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            login(values)
            .then((data) => {
                if(data.error) setError(data.error)
                setSuccess(data.message)
                setAccessToken(data.accessToken)
                return <Navigate to="/" />
                
            })

        })
    }
    return(
        <CardWrapper
            heading="Admin Login"
            label="Welcome Back!, Mr. Admin"
        >
            <Form
                {...form}
            >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="john@doe.com"
                                        type="email"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="123456"
                                        type="password"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between ">
                        <div className="flex items-center justify-between gap-2">
                            <Checkbox id="rmbr"/> <label htmlFor="rmbr" className="text-xs">Remember Me!</label>
                        </div>
                        <div>
                            <Button size="sm" variant="link" asChild disabled={isPending}>
                                <Link to="/forgot-password">Forgot Password ?</Link>
                            </Button>
                        </div>
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success} />
                    <Button 
                        type="submit"
                        className="w-full"
                    >Login</Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm