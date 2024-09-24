import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { FilterIcon, VerticalThreeDots } from "@/public/svg/icons";
import { Separator } from "./ui/separator";
// import { transactionData } from "@/constants/transactionCards";
import TransactionCard from "./transaction-card";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { DownIcon, UpIcon } from "@/public/svg/Indicator";
import { ReportCard } from "./ui/reportCard";
import TransactionFilter from "./transaction-filter";
import {
  getAverageValues,
  getLastTransactions,
  getListings,
} from "@/repository/tanstack/queries/functions.queries";
import { useQuery } from "@tanstack/react-query";
import { getTransactionData } from "@/transcation/dataConverter";
import { FilterContext } from "@/context/filter/filter-provider";
import ReportSection from "./insights/reportsection/reportsection";
import PropertiesCard from "./propertiesCard";

import { ListingDataType } from "@/types/listing";

function ListingTab() {
  const {
    data: Listing,
    isLoading: isLoading,
    isError: isError,
  } = useQuery(getListings());

  console.log("Listing", Listing);

  return (
    <>
      {Listing?.map((property, index) => (
        // <Link href={`/my-property/${index + 1}`} key={index} passHref>
        // <PropertiesCard {...property} key={index} />
        // </Link>
        <>TODO</>
      ))}
    </>
  );
}

export default ListingTab;
