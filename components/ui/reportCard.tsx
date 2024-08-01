import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

interface ReportProps {
    title:string
    value: string |number
    color: string
    description: ReactNode
}

export const ReportCard : React.FC<ReportProps> = (props) => {

    return (
          <Card className="rounded-3xl bg-[#F4F3F9] border-none">
          <CardHeader className="py-3">
            <CardDescription className="text-xs font-semibold">{props.title}</CardDescription>
          </CardHeader>
          <CardContent className="py-0">
            <p className="text-2xl font-semibold">{props.value}</p>
          </CardContent>
          <CardFooter className="py-3">
            <p>{props.description}</p>
          </CardFooter>
        </Card>   
    )
}