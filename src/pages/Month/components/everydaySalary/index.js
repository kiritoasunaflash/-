import classNames from "classnames";
import "./index.scss";
import { useMemo } from "react";
const DailyBill = ({ date, billList }) => {
  const dayResult = useMemo(() => {
    console.log(billList);
    if (billList && billList?.length > 0) {
      const payMoney = billList
        .filter((item) => item.type == "pay")
        .reduce((prev, current) => prev + current.money, 0);
      const income = billList
        .filter((item) => item.type == "income")
        .reduce((prev, current) => prev + current.money, 0);
      return {
        payMoney,
        income,
        allTotal: payMoney + income,
      };
    } else {
      return;
    }
  }, [billList]);
  return (
    <div className={classNames("dailyBill")}>
      <div className="headers">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames("arrow")}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.payMoney.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.allTotal.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DailyBill;
