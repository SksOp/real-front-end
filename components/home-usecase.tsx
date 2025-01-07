import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import IntoCard from "./intoCard";
import { InsightLogo } from "@/public/svg/toolbox";
import { SalesInsightLogo } from "@/public/svg/insights";
import { useCaseItems } from "@/constants/useCases";
import { CalculatorsItems } from "@/constants/calculators";
import { useAuth } from "@/lib/auth";
import LoginTrigger from "./loginTrigger";

function HomeUsecase() {
  const auth = useAuth();
  return (
    <Tabs className="w-full " defaultValue="insights">
      <Card className="border rounded-2xl bg-background w-full py-4 px-3 flex flex-col gap-4">
        <CardHeader className="p-0 w-full flex flex-col gap-4">
          <CardTitle className="text-secondary font-semibold text-lg">
            Insights by usecases
          </CardTitle>
          <TabsList className="w-full gap-2 items-center justify-start bg-background overflow-x-scroll ">
            <TabsTrigger
              value={"insights"}
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Insights
            </TabsTrigger>
            <TabsTrigger
              value={"calculators"}
              className="rounded-full border border-muted text-sm text-center font-medium text-muted data-[state=active]:bg-secondary data-[state=active]:border-0 data-[state=active]:text-white"
            >
              Calculators
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="p-0 w-full ">
          <TabsContent
            value={"insights"}
            className="p-0 w-full flex flex-col gap-4 mt-0"
          >
            {useCaseItems.map((item, index) =>
              auth.user ? (
                <IntoCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  avatar={item.avatar}
                  avatarBg={item.avatarBg}
                  linkto={item.linkto}
                  soon={item.soon}
                />
              ) : (
                <LoginTrigger
                  key={index}
                  className="w-full p-0 h-full text-left"
                >
                  <IntoCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    avatar={item.avatar}
                    avatarBg={item.avatarBg}
                    soon={item.soon}
                  />
                </LoginTrigger>
              )
            )}
          </TabsContent>
          <TabsContent
            value={"calculators"}
            className="p-0 w-full flex flex-col gap-4 mt-0"
          >
            {CalculatorsItems.map((item, index) =>
              auth.user ? (
                <IntoCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  avatar={item.avatar}
                  avatarBg={item.avatarBg}
                  linkto={item.linkto}
                  soon={item.soon}
                />
              ) : (
                <LoginTrigger
                  key={index}
                  className="w-full p-0 h-full text-left"
                >
                  <IntoCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    avatar={item.avatar}
                    avatarBg={item.avatarBg}
                    soon={item.soon}
                  />
                </LoginTrigger>
              )
            )}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}

export default HomeUsecase;
