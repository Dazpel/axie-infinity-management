import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { ReactComponent as EthereumIcon } from "../../assets/svg/ethereum.svg";
import { ReactComponent as SlpIcon } from "../../assets/svg/slp.svg";
import { ReactComponent as AxsIcon } from "../../assets/svg/axs.svg";
import { useEffect, useState } from "react";
import { fetchCryptoCoins } from "../../utils/functions";

export default function CryptoList() {
  const [cryptoData, setCryptoData] = useState<null | any[]>(null);
  useEffect(() => {
    let isMounted: Boolean = true;

    if (isMounted) {
      const getUserPricesAndMethods = async () => {
        const resObject = await fetchCryptoCoins([
          EthereumIcon,
          SlpIcon,
          AxsIcon,
        ]);
        if (resObject.success) {
          setCryptoData(resObject.data);
        }
      };
      getUserPricesAndMethods();

      //update price every minute
      setInterval(async function () {
        if (isMounted) getUserPricesAndMethods();
      }, 60000);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Grid>
      <List>
        {cryptoData &&
          cryptoData.map((el) => {
            let colorText = el.percentageChange_24h > 0 ? "green" : "red";
            let changeSign = el.percentageChange_24h > 0 ? "+" : "";
            return (
              <ListItem button key={el.coinName}>
                <ListItemIcon>{el.icon}</ListItemIcon>
                <Typography style={{ fontSize: 14, fontWeight: 600 }}>
                  {el.price} USD
                  <span
                    style={{ color: colorText, fontSize: 14, marginLeft: 10 }}
                  >
                    {changeSign}
                    {el.percentageChange_24h}%
                  </span>
                </Typography>
              </ListItem>
            );
          })}
      </List>
    </Grid>
  );
}
