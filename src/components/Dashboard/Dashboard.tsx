import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {
  fetchOneCoinPrice,
  fetchScholarAccountData,
} from "../../utils/functions";
import LoadingOverlay from "../Loader/LoadingOverlay";
import { useAppSelector } from "../store/hooks";
import AddScholarModal from "./AddScholarModal";
import { DashboardInfoCard } from "./DashboardInfoCard";
import NoScholarsDataTable from "./NoScholarsDataTable";
import ScholarsDataTable from "./ScholarsDataTable";
import "./styles.css";

export default function Dashboard() {
  const [rows, setRows] = useState<any[]>([]);
  const [cardInfoData, setCardInfoData] = useState<Object>({});
  const [isLoading, setIsLoading] = useState(true);
  const [slpValue, setSlpValue] = useState<number>(0);
  const manager = useAppSelector((state) => state.manager);
  const hasScholars = manager.scholarsId.length > 0 ? true : false;

  useEffect(() => {
    let isMounted: Boolean = true;

    if (isMounted) {
      const populateRowDataFunction = async (dataArray: string[]) => {
        let scholarDataObject: any[] = [];
        let cardInfoObject = {
          "Total average": 0,
          "Total SLP": 0,
          "Total unclaimed SLP": 0,
          "Total claimed SLP": 0,
          "Total manager SLP": 0,
          "Total Scholar SLP": 0,
        };
        for (let index = 0; index < dataArray.length; index++) {
          const scholarId = dataArray[index];
          try {
            let res = await fetchScholarAccountData(scholarId);
            if (res?.success && res?.data) {
              cardInfoObject = {
                ...cardInfoObject,
                "Total average":
                  cardInfoObject["Total average"] + res?.data?.slpAverage,
                "Total SLP": cardInfoObject["Total SLP"] + res?.data?.total,
                "Total unclaimed SLP":
                  cardInfoObject["Total unclaimed SLP"] +
                  res?.data?.unclaimedSlp,
                "Total manager SLP":
                  cardInfoObject["Total manager SLP"] +
                  res?.data?.managerShare.slp,
                "Total Scholar SLP":
                  cardInfoObject["Total Scholar SLP"] +
                  res?.data?.scholarShare.slp,
              };
              scholarDataObject.push(res?.data);
            }
          } catch (error) {
            throw error;
          }
        }
        cardInfoObject["Total average"] = Math.round(
          cardInfoObject["Total average"] / dataArray.length
        );
        let slpPrice = await fetchOneCoinPrice("smooth-love-potion");
        if (slpPrice) {
          setSlpValue(slpPrice);
        }
        setCardInfoData(cardInfoObject);
        setRows(scholarDataObject);
        setIsLoading(false);
      };
      if (manager?.scholarsId) populateRowDataFunction(manager?.scholarsId);
    }

    return () => {
      isMounted = false;
    };
  }, [manager.scholarsId]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Grid className="dashboard__mainContainer">
      <Grid className="dashboard__cardContainer">
        {!isLoading &&
          Object.entries(cardInfoData).map(([title, value], index) => (
            <DashboardInfoCard
              key={index}
              title={title}
              value={value}
              slpValue={slpValue}
            />
          ))}
      </Grid>
      <Box style={{ marginBottom: "0.7rem", marginLeft: "1rem" }}>
        <AddScholarModal managerState={manager} />
      </Box>

      <Grid>
        {hasScholars ? (
          <ScholarsDataTable
            scholarIdArray={manager.scholarsId}
            managerId={manager.uid}
          />
        ) : (
          <NoScholarsDataTable />
        )}
      </Grid>
    </Grid>
  );
}
