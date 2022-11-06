import { CurrenciesSortMenu } from "../currencies/currenciesList/currenciesSortMenu/CurrenciesSortMenu";
import CoinCard from "../cards/coinCard/CoinCard";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import classes from "../currencies/currenciesList/CurrenciesList.module.scss";
import { watchlistActions } from "../../store/watchlist/watchlist-slice";
import { useEffect } from "react";
//types
import { AppDispatch, RootState } from "../../store/store";
import { CurrencyItem } from "../../types/types";

export const Watchlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { watchItems: data, sortActive } = useSelector(
    (state: RootState) => state.watchlist
  );

  useEffect(() => {
    dispatch(watchlistActions.sortData());
  }, [dispatch, sortActive]);

  const WatchlistContent = data.length && (
    <>
      <h2 className="center-item">
        Your <span>watchlist</span> items.
      </h2>
      <div className={classes["market-list"]}>
        <CurrenciesSortMenu page={"watchlist"} />
        {data.map((item: CurrencyItem) => {
          return <CoinCard key={item.id} item={item} />;
        })}
      </div>
    </>
  );
  const NoItemsContent = !data.length && (
    <p className="center-item xl">
      No items, you can add coin from <Link href="/">Home Page</Link> to your
      watchlist.
    </p>
  );
  return (
    <>
      {WatchlistContent}
      {NoItemsContent}
    </>
  );
};
