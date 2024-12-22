import React, { use, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Info } from "lucide-react";
import MatrixCard from "./matrix-card";
import {
  RentalMatrix,
  SalesMatrix,
  SalesTransactionApi,
} from "@/config/utility";
import { MatrixData } from "@/config/types";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config/constant";
import { useAuth } from "@/lib/auth";
import LoginTrigger from "./loginTrigger";
import {
  getRentalMatrix,
  getSalesMatrix,
} from "@/repository/tanstack/queries/matrices.queries";
import { useQuery } from "@tanstack/react-query";
import {
  RentalApiResponse,
  SalesApiResponse,
} from "@/types/apiResponses/matrices";

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
  const {
    data: SalesTransactions,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = getSalesMatrix({
    end_year: new Date().getFullYear(),
    start_year: new Date().getFullYear() - 1,
  });

  const {
    data: rentalTransactions,
    isLoading: isRentalLoading,
    isError: isRentalError,
  } = getRentalMatrix({
    end_year: new Date().getFullYear(),
    start_year: new Date().getFullYear() - 1,
  });

  const {
    data: mortageTransactions,
    isLoading: isMortageLoading,
    isError: isMortageError,
  } = getSalesMatrix({
    end_year: new Date().getFullYear(),
    start_year: new Date().getFullYear() - 1,
    group_en: "Mortgage",
  });

  useEffect(() => {
    if (SalesTransactions) {
      const matrixOutputSales = SalesMatrix(
        SalesTransactions as SalesApiResponse
      );
      setSalesMatrix(matrixOutputSales);
    }
    if (rentalTransactions) {
      const matrixOutputRental = RentalMatrix(
        rentalTransactions as RentalApiResponse
      );
      setRentalMatrix(matrixOutputRental);
    }
    if (mortageTransactions) {
      const matrixOutputMortage = SalesMatrix(
        mortageTransactions as SalesApiResponse
      );
      setMortageMatrix(matrixOutputMortage);
    }
  }, [SalesTransactions, rentalTransactions, mortageTransactions]);

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
              value="mortage"
              className="rounded-full border border-muted text-sm text-center font-normal text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Mortage
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="w-full flex">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              {salesMatrix.map((item, index) => (
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
              {rentalMatrix.map((item, index) => (
                <MatrixCard
                  key={index}
                  title={item.title}
                  value={item.value}
                  growth={item.growth}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="mortage" className="w-full flex  mt-0">
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
          <h3 className="text-sm font-normal truncate text-accent">
            2024 data in comparison with previous year is shown.
          </h3>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default HomeTransactionCard;
