"use client";

import { ReportCard } from "@/components/ui/reportCard";
import { DownIcon, UpIcon } from "@/public/svg/Indicator";
import { TransactionData } from "@/transcation/dataConverter";

interface reportprop {
  data: TransactionData;
}

export default function ReportSection({
  transactionData,
}: {
  transactionData: TransactionData;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 px-3">
      <ReportCard
        title="Average Sales Value"
        value={transactionData.averageValue || 5000}
        color="green"
        description={
          <>
            <div className="flex items-center justify-center">
              {transactionData.growthAverageValue[0] !== "-" ? (
                <UpIcon className={{ width: "20", hight: "20" }} />
              ) : (
                <DownIcon />
              )}
              <p
                className={`text-xs font-semibold ${
                  transactionData.growthAverageValue[0] !== "-"
                    ? "text-[#0AAE11]"
                    : "text-[#EB3C70]"
                }`}
              >
                {`${transactionData.growthAverageValue}`}
              </p>
              <p className="text-xs font-semibold text-[#BBBBBB] px-1">{`vs last year`}</p>
            </div>
          </>
        }
      />
      <ReportCard
        title="Total Sales Value"
        value={transactionData.totalValue || "$3.5 M"}
        color="green"
        description={
          <>
            <div className="flex items-center justify-center">
              {transactionData.growthTotalValue[0] !== "-" ? (
                <UpIcon className={{ width: "20", hight: "20" }} />
              ) : (
                <DownIcon />
              )}
              <p
                className={`text-xs font-semibold ${
                  transactionData.growthTotalValue[0] !== "-"
                    ? "text-[#0AAE11]"
                    : "text-[#EB3C70]"
                }`}
              >
                {`${transactionData.growthTotalValue}`}
              </p>
              <p className="text-xs font-semibold text-[#BBBBBB] px-1">{` vs last year`}</p>
            </div>
          </>
        }
      />

      <ReportCard
        title="YoY Growth"
        value={transactionData.yoyGrowth}
        color="green"
        description={
          <>
            <div className="flex items-center justify-center">
              {transactionData.growthYoyValue[0] !== "-" ? (
                <UpIcon className={{ width: "20", hight: "20" }} />
              ) : (
                <DownIcon />
              )}
              <p
                className={`text-xs font-semibold ${
                  transactionData.growthYoyValue[0] !== "-"
                    ? "text-[#0AAE11]"
                    : "text-[#EB3C70]"
                }`}
              >
                {`${transactionData.growthYoyValue}`}
              </p>
              <p className="text-xs font-semibold text-[#BBBBBB] px-1">{` vs last year`}</p>
            </div>
          </>
        }
      />
      <ReportCard
        title="Total Sales Transactions"
        value={transactionData.totalTransactions}
        color="green"
        description={
          <div className="flex items-center justify-center">
            {transactionData.growthTotalTransactions[0] !== "-" ? (
              <UpIcon className={{ width: "20", hight: "20" }} />
            ) : (
              <DownIcon />
            )}
            <p
              className={`text-xs font-semibold ${
                transactionData.growthTotalTransactions[0] !== "-"
                  ? "text-[#0AAE11]"
                  : "text-[#EB3C70]"
              }`}
            >
              {`${transactionData.growthTotalTransactions}`}
            </p>
            <p className="text-xs font-semibold text-[#BBBBBB] px-1">{` vs last year`}</p>
          </div>
        }
      />
    </div>
  );
}
