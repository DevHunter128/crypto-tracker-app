import { ExchangeType } from "../../../types/types";
import classes from "./Exchange.module.scss";

export const Exchange = ({ ...props }) => {
  const {
    name,
    year_established,
    country,
    description,
    url,
    image,
    trade_volume_24h_btc_normalized,
    trust_score_rank,
  } = props.item as ExchangeType;
  return (
    <div className={classes.container}>
      <div className={classes["name-box"]}>
        <img src={image} alt={name + "logo"} />
        <p>{name} </p>
      </div>
      <div className={classes["data-box"]}>
        <p>
          Country: <span>{country ? country : "No data"}</span>
        </p>
        <p>
          Year established:{" "}
          <span>{year_established ? year_established : "No data"}</span>
        </p>
        <p className={classes.volume}>
          Trade Volume 24h:{" "}
          <span>{trade_volume_24h_btc_normalized.toFixed(4)} BTC</span>
        </p>
        <p>
          Trust Score Rank: <span>{trust_score_rank}</span>
        </p>
        <p>
          View Exchange: <a href={url}>{name}</a>
        </p>
        {description.length !== 0 && (
          <p className={classes.description}>{description}</p>
        )}
      </div>
    </div>
  );
};
