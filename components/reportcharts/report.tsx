import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

interface ReportProps {
    title:string
    value: () => string
    color: string
    description: string 
}

export const ReportCard : React.FC<ReportProps> = (props) => {

    return (
        <Card>
        <CardHeader>
          <CardDescription>{props.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{props.value()}</p>
        </CardContent>
        <CardFooter>
          <p>{props.description}</p>
        </CardFooter>
      </Card>   
    )
}