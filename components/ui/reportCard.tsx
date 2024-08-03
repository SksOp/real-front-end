import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

interface ReportProps {
    title:string
    value: number
    color: string
    description: string 
}

export const ReportCard : React.FC<ReportProps> = (props) => {

    return (
          <Card className="rounded-3xl ">
          <CardHeader className="py-3">
            <CardDescription className="text-xs font-semibold">{props.title}</CardDescription>
          </CardHeader>
          <CardContent className="py-0">
            <p>{props.value}</p>
          </CardContent>
          <CardFooter className="py-3">
            <p>{props.description}</p>
          </CardFooter>
        </Card>   
    )
}