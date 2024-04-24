import React, { useEffect, useState } from "react";
import { Table, Button, Flex } from "antd";
import { getOrder } from "../api/order.api";
import { getCustomer } from "../api/customer.api";
import { getStore } from "../api/store.api";
import { toast } from "react-toastify";

const Order = () => {
  const [pageSize, setPageSize] = useState(6);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { response, err } = await getOrder(currentPage, pageSize);

      if (err) {
        toast.error("Error fetching orders!");
      } else {
        setOrders(response);
      }
    } catch (error) {
      toast.error("Error fetching orders!");
    }
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "user",
      key: "user",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      align: "center",
      render: (shippingAddress) => (
        <span>
          {`${shippingAddress.fullName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.phone}`}
        </span>
      ),
    },
    {
      title: "Order Items",
      dataIndex: "orderItems",
      key: "orderItems",
      align: "center",
      render: (orderItems) => (
        <span>
          {orderItems
            .map((item) => `${item.name} x ${item.quanlity}`)
            .join(", ")}
        </span>
      ),
    },
    {
      title: "Order Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
    },
    {
      title: "Store",
      dataIndex: "storeId",
      key: "storeId",
      align: "center",
    },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "orderedAt",
      key: "orderedAt",
      align: "center",
      render: (orderedAt) => (
        <span>{new Date(orderedAt).toLocaleString()}</span>
      ),
    },
    {
      title: "Delivery status",
      dataIndex: "delivery",
      key: "delivery",
      render: (delivery) => (
        <span>{delivery ? "Delivered" : "Not delivered"}</span>
      ),
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "right",
      render: (_, category) => (
        <div className="actions-cell" style={{ textAlign: "right" }}>
          <Flex wrap="wrap" gap="small" justify="flex-end" align="center">
            <Button type="primary">Confirm</Button>
          </Flex>
        </div>
      ),
    },
  ];

  return (
    <Flex vertical gap={10} justify="end">
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        bordered
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: orders.length,
          onChange: (page, pageSize) => setCurrentPage(page),
        }}
      />
    </Flex>
  );
};

export default Order;
