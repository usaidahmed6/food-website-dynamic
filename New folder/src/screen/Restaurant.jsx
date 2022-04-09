import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Upload, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Restaurant.css";
import {
  DeleteOutlined,
  EllipsisOutlined,
  UploadOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Select } from "antd";
import Meta from "antd/lib/card/Meta";
import { Navbar, Container, Nav } from "react-bootstrap";

import {
  addDoc,
  userRef3,
  getDownloadURL,
  ref,
  storage,
  getDocs,
  uploadBytes,
  userRef4,
  auth,
  collection,
  db,
  deleteDoc,
  doc,
  onSnapshot,
} from "./firebase";
import { query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import loader from "../screen/images/loader.gif";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="main">
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
              // setLoading(true)
            })
            // setLoading(false)

            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name={["name"]}
            label="Item Name "
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={["description"]}
            label="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="textarea" maxLength={100} />
          </Form.Item>

          {/* <Select defaultValue="Category" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="cash">cash on delivery</Option>
                        <Option value="creditCard">credit card</Option>
                      
                    </Select> */}

          <Form.Item
            name={["price"]}
            label="price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="number"
              style={{
                width: 100,
              }}
            />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export const Restaurant = () => {
  const [res, setRes] = useState([false]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        navigate("/login");
      }
    });

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 6000);
    getFoodOrder();

    onSnapshot(
      collection(db, "AddDishes"),
      (snapshot) => {
        getDishe();
      },

      (error) => {
        alert(error);
      }
    );
  }, []);

  const getDishe = async () => {
    console.log("uid hey???", auth.currentUser.uid);
    const q = query(userRef3, where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    let dish = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      dish.push({ id: doc.id, ...doc.data() });
    });
    setRes(dish);
  };

  const [visible, setVisible] = useState(false);
  const { Option } = Select;

  const deleteDocument = async (id) => {
    const deleted = await deleteDoc(doc(db, "AddDishes", id));
    console.log("evnet=>", deleted);
    console.log(id);
  };

  const deleteOrder = async (id) => {

    
    const deleted = await deleteDoc(doc(db, "shoppnigCard", id));
    console.log("evnet=>", deleted);
    console.log(id);
  };

  const onCreate = async (values) => {
    console.log("Received values of form: =============", values);

    const collectionImage = await uploadImageToFirebase(
      values.upload[0].originFileObj
    );
    if (collectionImage) {
      console.log("hogaya bhai=================>", auth.currentUser.uid);
      console.log("values", values);
      console.log("name=====>", values.name);
      console.log("description", values.description);
      console.log("price", values.price);
      let obj = {
        collectionName: values.name,
        description: values.description,
        price: values.price,
        collectionImage,
        uid: auth.currentUser.uid,
      };
      addDoc(userRef3, obj);
      setVisible(false);
    }
  };

  const uploadImageToFirebase = async (file) => {
    let collectionImage;
    try {
      const storeageRef = ref(storage, file.name);
      const upload = await uploadBytes(storeageRef, file);
      console.log("file uploaded");
      const imageUrl = await getDownloadURL(storeageRef);
      collectionImage = imageUrl;
    } catch (err) {
      console.log(err.msg);
    }
    return collectionImage;
  };

  const getFoodOrder = async () => {
    console.log("uid hey???", auth.currentUser.uid);
    const q =  query(userRef4, where("uid", "==",  auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    let orders = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " order wali hey => ", doc.data());
      orders.push({ id: doc.id, ...doc.data() });
    });
    setOrder(orders);
    console.log("new food order =======>", order);
  };

  const [theme, setTheme] = React.useState("light");
  const [current, setCurrent] = React.useState("1");

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <div className="main">
      {/* <h1 className='text-center h-1'>Add Dishes</h1> */}
      <b
        onClick={() => {
          setVisible(true);
        }}
        className={"btn-co"}
      >
        Add dishes
      </b>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />

      {loading ? (
        <div className="loader-container">
          <img src={loader} alt="" />
        </div>
      ) : (
        <>
          <h1 className="heading text-center">
            {" "}
            Restaurant <span> Dishes </span>{" "}
          </h1>
          <div className="main-div-hohe">
            <section className="gallery" id="gallery">
              <div className="box-container">
                {res.map((data, index) => {
                  return (
                    <div className="box" key={index}>
                      <img src={data.collectionImage} alt="" />
                      <div className="content">
                        <h3>{data.collectionName}</h3>
                        <p> {data.description} </p>
                        <span
                          className="btn-co"
                          onClick={() => deleteDocument(data.id)}
                        >
                          delete
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </>
      )}

      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Dashboard</h1>

            <div className="row">
              <div className="col-xl-12">
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-chart-area me-1"></i>
                    Orders
                  </div>

                  <>
                    <Navbar bg="dark" variant="dark">
                      <Container>
                        <Navbar.Brand href="#home">Home</Navbar.Brand>
                        <Nav className="me-auto">
                          <Nav.Link href="#features">Delivered Ted</Nav.Link>
                        </Nav>
                      </Container>
                    </Navbar>
                    <table>
                      <tr>
                        <th>food Image</th>
                        <th>Food Name</th>
                        <th>Food Price</th>
                      </tr>

                      {order.map((data, index) => {
                        return (
                          <tr>
                            <td>
                              
                              <img src={data.image} className='orderimg'/>
                            </td>
                            <td> {data.name} </td>
                            <td> $ {data.price} </td>
                            <td>  <button className="btn btn-sm btn-warning"      onClick={() => deleteOrder(data.id)}> Accepted </button> </td>
                            <td>  <button className="btn btn-sm btn-danger"> Rejected </button> </td>
                          </tr>
                        );
                      })}
                    </table>
                  </>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
