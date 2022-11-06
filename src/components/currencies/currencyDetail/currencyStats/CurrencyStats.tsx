import classes from "./CurrencyStats.module.scss";
import { Coin } from "../../../../types/types";
import { BoxHeader } from "../boxHeader/BoxHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { CoinStatistic } from "../coinStatistic/CoinStatistic";
import { CoinLinks } from "../coinLinks/CoinLinks";
import { Chart } from "../chart/Chart";
import { Community } from "../communityBox/Community";
import { CoinDescription } from "../coinDescription/CoinDescription";

interface Props {
  item: Coin;
}
export const CurrencyStats = ({ item }: Props) => {
  const { chartData, chartIsUpdating } = useSelector(
    (state: RootState) => state.currencies
  );
  return (
    <div className={classes["box-container"]}>
      <BoxHeader item={item} />
      <div className={classes["box-wrapper"]}>
        <div className={classes.detials}>
          <CoinStatistic item={item} />
          <CoinLinks item={item} />
        </div>
        <Chart chartData={chartData} isUpdating={chartIsUpdating} />
      </div>
      <Community item={item} />
      <CoinDescription description={item.description.en} />
    </div>
  );
};
