"use client";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import NavbarShared from "../../../components/navbar/Navbar";
import Button from "react-bootstrap/Button";
import { enqueueSnackbar } from "notistack";
import {
  authorize,
  deleteBank,
  getAllBank,
  updateBank,
} from "../../../lib/services/UserServices/UserServices";
import Table from "../../../components/table/Table";
import {
  getAllPassbookRecord,
  passbook,
} from "../../../lib/services/AccountServices/Account";
import * as XLSX from "xlsx";
const page = ({ params }) => {
  const [isReset, setIsReset] = useState(false);
  const [flag, setflag] = useState(false);
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const exportToExcel = async (data, filename) => {
    let response = await getAllPassbookRecord(
      localStorage.getItem("id"),
      params.accountId
    );
    console.log(response.data);
    const ws = XLSX.utils.json_to_sheet(response.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, filename);
  };
  const [bankName, setBankName] = useState();
  const [bankNameForFilter, setBankNameForFilter] = useState("");

  const [id, setid] = useState();
  const [fromDate, setfromDate] = useState(new Date("2000/01/01"));
  // const [toDate, settoDate] = useState();
  const [toDate, setToDate] = useState(new Date());

  //   const [spinner,setSpinner]=useState(false)

  const [isLogin, setIsLogin] = useState(true);
  const handleUnAuthorize = async () => {
    const response = await authorize();
    setIsLogin(response.data.result);
  };
  useEffect(() => {
    handleUnAuthorize();
    // handleSubmit()
  }, []);
  useEffect(() => {
    // if (isLogin)
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    handleSubmit();
  }, [limit, page, isLogin, isReset]);

  const handleToDate = (e) => {
    // console.log(e.target.value);
    setToDate((prev) => e.target.Value);
  };
  const handleFromDate = (e) => {
    setfromDate((prev) => e.target.value);
  };

  if (!isLogin) {
    return (
      <h1>
        <a href="/">Please Login</a>
      </h1>
    );
  }
  const handleSubmit = async () => {
    try {
      let filterObject;
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

      if (flag) {
        filterObject = {
          limit: limit,
          page: page,
          toDate: toDate,
          fromDate: fromDate,
        };
      } else {
        filterObject = {
          limit: limit,
          page: page,
        };
      }
      const response = await passbook(
        filterObject,
        localStorage.getItem("id"),
        params.accountId
      );

      setData((prev) => response.data);
      setCount((prev) => response?.headers["x-total-count"]);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      if (flag) {
        setflag((prev) => false);
      }
    }
  };

  const handleReset = () => {
    setIsReset((prev) => !prev);

    handleSubmit();
  };
  return (
    <>
      {/* {spinner&&<Spinner/>} */}

      <NavbarShared username={localStorage.getItem("username")} reset={true} />

      <br></br>
      <label htmlFor="">{count}</label>
      <br />
     
      <Button
        className="btn btn-success mb-3"
        onClick={() => exportToExcel(data, "passbook.xlsx")}
      >
        {" "}
        Export Passbook To Excel File
      </Button>
      <form
        style={{
          display: "flex",
          justifyItems: "center",
          marginLeft: "30rem",
          marginBottom: "5rem",
          color: "rgb(85, 174, 194)",
        }}
      >
        <label>From Date</label>
        <input type="date" value={fromDate} onChange={handleFromDate} />
        <label>To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
          }}
        />

        <br />

        <button
          type="button"
          class="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            setPage((prev) => 1);
            setflag((prev) => true);
            handleSubmit();
          }}
        >
          Submit
        </button>
        <button type="button" class="btn btn-info" onClick={handleReset}>
          Reset
        </button>
      </form>
      <Table
        data={data}
        count={count}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
      />
    </>
  );
};

export default page;
