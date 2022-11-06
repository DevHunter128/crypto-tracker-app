import { createSlice } from "@reduxjs/toolkit";
import { getApiData } from "../../utils/getApiData";
import { sortCurrencies } from "../../helpers/sortCurrencies";
import { CurrenciesState } from "../../types/types";
import { CurrencyItem } from "../../types/types";

const currenciesSlice = createSlice({
  name: "currencies",
  initialState: {
    test: {},
    items: [],
    visibleItems: [],
    trendingItems: [],
    losersItems: [],
    gainersItems: [],
    chartData: [],
    chartIsUpdating: false,
    sortActive: {
      sortType: "ascending",
      sortBy: "market_cap_rank",
    },
  } as CurrenciesState,
  reducers: {
    setItems(state, action) {
      const items = action.payload.items.map((item: CurrencyItem) =>
        getApiData(item)
      );
      const keyInvalid = typeof action.payload.key === "undefined";
      const key = action.payload.key as number;
      if (!keyInvalid) {
        const newItems = {
          ...state.test,
          [`${key}`]: items,
        };
        state.test = newItems;
      }
      // state.items = state.test[key];
      state.items = items;
      state.trendingItems = sortCurrencies(state.items, {
        sortType: "descending",
        sortBy: "price_change_7d",
      }).slice(0, 50);
      state.losersItems = sortCurrencies(state.items, {
        sortType: "ascending",
        sortBy: "price_change_24h",
      }).slice(0, 50);
      state.gainersItems = sortCurrencies(state.items, {
        sortType: "descending",
        sortBy: "price_change_24h",
      }).slice(0, 50);
    },
    setVisibleItems(state, action) {
      const { items } = action.payload;
      const slicedItems = items;
      state.visibleItems = sortCurrencies(slicedItems, state.sortActive);
    },
    sortData(state) {
      state.visibleItems = sortCurrencies(state.visibleItems, state.sortActive);
    },
    updateSort(state, action) {
      state.sortActive = action.payload;
    },
    setChart(state, action) {
      state.chartData = action.payload;
    },
    setLoading(state, action) {
      state.chartIsUpdating = action.payload;
    },
  },
});

export const currenciesActions = currenciesSlice.actions;
export default currenciesSlice;
