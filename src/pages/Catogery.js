import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/Dashboard.css";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SearchItem from "../components/SearchItem";
import AddItem from "../components/AddItem";
import DataTable from "../components/DataTable";

const pattern = `^[A-Za-z\u0600-\u06FF\\s]{3,30}$`;

const LOGOUT_BACK = "/logout";
const ADD_URI_BACK = "/catagory/add";
const DELETE_URI_BACK = "/api/academic-year/delete";
const GET_URI_BACK = "/api/academic-year";

function Catogery() {
  const columns = [
    { field: "_id", headerName: "الرقم", width: 70 },
    { field: "name", headerName: "العام الدراسى", width: 200 },
    { field: "dateAdded", headerName: "تاريخ التسجيل", width: 270 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/user-dashboard/" + params.row._id}>
              <button className="edit"> تعديل </button>
            </Link> */}
            <button>
              <DeleteIcon
                className="delete"
                onClick={() => handleDelete(params.row._id)}
              />
            </button>
          </>
        );
      },
    },
  ];

  const [errorMsg, setErrorMsg] = useState({});
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [rows, setRows] = useState([{ _id: "", name: "" }]);

  const browToken = JSON.parse(window.localStorage.getItem("token"));

  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  useEffect(() => {
    if (rows.length === 1) {
      getData();
    }
  }, []);

  // console.log(rows);

  const preventNotValid = (e) => {
    if (
      /\d/.test(e.key) ||
      /[@!#%&?/,<>;:""=_`~.*+?^${}()|[\]\\]/g.test(e.key)
    ) {
      e.preventDefault();
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!newItem) return;

  //   // addItem
  //   addItem(newItem);
  //   setNewItem("");
  // };

  const getData = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${GET_URI_BACK}`,
        {
          token: browToken,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(data.data);
      setRows([...data.data]);
      // console.log(rows);
    } catch (error) {}
  };

  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(data.file[0]);
    const { cat, file } = data;
    // console.log(file);
    // console.log(file[0]);
    // setErrorMsg({});
    const img = new FormData();
    img.append(file[0].name, file[0]);
    console.log(img);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${ADD_URI_BACK}`,
        {
          token: browToken,
          name: cat,
          image: file[0],
        },

        {
          data: { token: browToken },
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(res);

      // Check res Message
      if (res.status === 200) {
        notfyAdd();
      }

      // Check User Role
      const role = res.data.roles;
      console.log(role);
    } catch (error) {
      if (error) {
        console.log(error);
        // console.log(error.response.status);
        if (error.response?.status === 401) {
          // console.log("warning");
          // logoutUser();
        } else {
          notfyWarning();
        }
      }
    }
  };

  const logoutUser = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${LOGOUT_BACK}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 204) {
        window.localStorage.setItem("link", JSON.stringify("المتدربين"));
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("Name");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("Role");
        // dispatch(setUser({ name: "", _id: "", role: "" }));
        // navigate("/");
        window.location.reload();
      }
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOSTNAME}${DELETE_URI_BACK}`,
        {
          data: { _id: id, token: browToken },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      notfyDelete();
      setRows([...res.data.data]);
    } catch (error) {}
  };

  const notfyAdd = () => {
    toast.done("👍👍👍 تم الإضافة بنجاح", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notfyWarning = () => {
    toast.error("حدث خطأ أثناء الأضافة", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notfyDelete = () => {
    toast.info("👍👍👍 تم الحذف بنجاح", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="content">
          <div className="operations">
            <div className="add-item">
              {/* <AddItem
                label={"إضافة مجال"}
                placeholder={"المجال التدريبى"}
                pattern={pattern}
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
                onKeyPress={preventNumber}
              /> */}
              <form
                id="form"
                className="addForm"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* {inputs.map((input) => (
            <FormInput
              key={input.id}
              className="input"
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))} */}
                <label
                  style={{
                    fontSize: "21px",
                    fontWeight: "bold",
                    color: "blue",
                  }}
                >
                  إضافة مجال
                </label>
                <input
                  id="cat"
                  className="input"
                  type="text"
                  placeholder="المجال التدريبى"
                  {...register("cat", {
                    required: {
                      value: true,
                      message: "هذا الحقل مطلوب",
                    },
                  })}
                  onKeyDown={preventNotValid}
                />
                <p>
                  {errorMsg?.msgBackEmail !== undefined
                    ? errorMsg?.msgBackEmail
                    : errors.cat?.message}
                </p>
                <input
                  id="file"
                  className="input"
                  type="file"
                  placeholder="أرفق صورة"
                  {...register("file", {
                    required: {
                      value: true,
                      message: "هذا الحقل مطلوب",
                    },
                    validate: (value) => {
                      const acceptedFormats = ["jpg", "png", "gif", "jpeg"];
                      const fileExtension = value[0]?.name
                        .split(".")
                        .pop()
                        .toLowerCase();
                      // console.log(value[0]?.size);
                      // console.log(typeof value[0]?.size);
                      // const size = value[0]?.size;
                      // if (size < 5) {
                      //   return "حجم الملف لا يجب ان يكون اكبر من 5 ميجا";
                      // }
                      if (!acceptedFormats.includes(fileExtension)) {
                        return "نوع الملف يجب ان يكون صورة";
                      }
                      return true;
                    },
                  })}
                />
                <p>
                  {errorMsg?.msgBackPass !== undefined
                    ? errorMsg?.msgBackPass
                    : errors.file?.message}
                </p>
                <button type="submit">
                  <FaPlus />
                </button>
              </form>
            </div>
            <SearchItem
              pattern={pattern}
              search={search}
              setSearch={setSearch}
            />
          </div>
          <DataTable
            columns={columns}
            rows={rows.filter((item) => {
              if (item._id !== "") {
                return item.name.toLowerCase().includes(search.toLowerCase());
              }
            })}
          />
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Catogery;
