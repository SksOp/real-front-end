import React, { use, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Info } from "lucide-react";
import MatrixCard from "./matrix-card";
import { CalculateMatrix, SalesTransactionApi } from "@/config/utility";
import { MatrixData } from "@/config/types";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config/constant";
import { useAuth } from "@/lib/auth";
import LoginTrigger from "./loginTrigger";
import MatrixSkeleton from "./matrixSkeleton";
import SignupTrigger from "./signupTrigger";
import { CalculateMatrixSales } from "@/config/salesMatrix";
import { CalculateMatrixRental } from "@/config/rentalMatrix";

interface MatrixCardProps {
  title: string;
  value: string;
  growth?: number;
}

// interface HomeTransactionCardProps {
//   cardItems: MatrixCardProps[];
// }

function HomeTransactionCard() {
  const [salesMatrix, setSalesMatrix] = React.useState<MatrixData[]>([]);
  const [rentalMatrix, setRentalMatrix] = React.useState<MatrixData[]>([]);
  const [mortageMatrix, setMortageMatrix] = React.useState<MatrixData[]>([]);
  const router = useRouter();
  const auth = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const date = new Date();
      const presentYear = date.getFullYear();

      setIsLoading(true);
      const token = await auth?.user?.getIdToken(true);
      const matrixOutputSales = await CalculateMatrixSales(
        {
          start_year: presentYear - 1,
          end_year: presentYear,
          usage_en: "Residential",
        },
        token
      );
      setSalesMatrix(matrixOutputSales);

      const matrixOutputMortgage = await CalculateMatrixSales(
        {
          start_year: presentYear - 1,
          end_year: presentYear,
          usage_en: "Residential",
          group_en: "Mortgage",
        },
        token
      );
      setMortageMatrix(matrixOutputMortgage);

      const matrixOutputRental = await CalculateMatrixRental(
        {
          start_year: presentYear - 1,
          end_year: presentYear,
          usage_en: "Residential",
        },
        token
      );

      setRentalMatrix(matrixOutputRental);
      setIsLoading(false);
    };

    fetchTransactions();
  }, []);

  return (
    <Card className="border rounded-xl bg-background w-full px-3 py-4 flex flex-col gap-3">
      <CardHeader className="flex flex-row justify-between items-center text-center p-0 w-full ">
        <h3 className="text-lg font-semibold text-secondary">Transactions</h3>
        {auth.user ? (
          <h3
            className="text-sm font-semibold text-primary cursor-pointer"
            onClick={() => router.push("/app/transactions")}
          >
            Go to transactions
          </h3>
        ) : (
          <LoginTrigger className="flex justify-end w-full">
            <h3 className="text-sm font-semibold text-primary cursor-pointer">
              Go to transactions
            </h3>
          </LoginTrigger>
        )}
      </CardHeader>
      <CardContent className="p-0 w-full flex flex-col gap-3">
        <Tabs defaultValue="sales">
          <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll ">
            <TabsTrigger
              value="sales"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              value="rental"
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Rental
            </TabsTrigger>
            <TabsTrigger
              value="mortgage"
              className="rounded-full border border-muted text-sm text-center font-normal text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Mortgage
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="w-full flex">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <MatrixSkeleton key={index} />
                  ))
                : salesMatrix.map((item, index) => (
                    <MatrixCard
                      key={index}
                      title={item.title}
                      value={item.value}
                      growth={item.growth}
                    />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="rental" className="w-full flex  mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <MatrixSkeleton key={index} />
                  ))
                : rentalMatrix.map((item, index) => (
                    <MatrixCard
                      key={index}
                      title={item.title}
                      value={item.value}
                      growth={item.growth}
                    />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="mortgage" className="w-full flex  mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              {mortageMatrix.map((item, index) => (
                <MatrixCard
                  key={index}
                  title={item.title}
                  value={item.value}
                  growth={item.growth}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <CardFooter className="flex gap-1 justify-start items-center p-0">
          <Info size={16} className="stroke-accent" />
          {auth.user ? (
            <h3 className="text-sm font-normal truncate text-accent">
              2024 data in comparison with previous year is shown.
            </h3>
          ) : (
            <h3 className="text-sm font-normal truncate text-accent flex gap-1">
              Don't have account?{" "}
              <SignupTrigger>
                <span className="text-primary font-semibold">
                  Create account
                </span>
              </SignupTrigger>
            </h3>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default HomeTransactionCard;
