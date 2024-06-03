import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import { current } from "@reduxjs/toolkit";

const Month = () => {
  const [dataVisble, setDataVisble] = useState(false);
  const [dateValue, setDateValue] = useState(() => {
    return new Date();
    // return new Date();
  });
  const [monthList, setMonthList] = useState([]);
  const { billList } = useSelector((state) => state.bill);
  const groupList = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  const onConfirm = (value) => {
    setDateValue(value);
    setDataVisble(false);
    const formatDate = dayjs(value).format("YYYY-MM");
    setMonthList(groupList[formatDate]);
    console.log(formatDate);
    console.log(monthList);
  };
  const monthResult = useMemo(() => {
    console.log(monthList);
    if (monthList && monthList?.length > 0) {
      const payMoney = monthList
        .filter((item) => item.type == "pay")
        .reduce((prev, current) => prev + current.money, 0);
      const income = monthList
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
  }, [monthList]);
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div
            className="date"
            onClick={() => {
              setDataVisble(true);
            }}
          >
            <span className="text">
              {dayjs(dateValue).format("YYYY")} | {dayjs(dateValue).format("M")}
              月账单
            </span>
            <span
              className={classNames("arrow", dataVisble && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.payMoney.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.allTotal.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dataVisble}
            onCancel={() => {
              setDataVisble(false);
            }}
            onConfirm={onConfirm}
            value={dateValue}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Month;
