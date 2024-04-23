import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Flex } from "antd";
import {
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../api/category.api";
import { toast } from "react-toastify";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { response, err } = await getCategory();

      if (err) {
        toast.error("Error fetching categories!");
      } else {
        setCategories(response);
      }
    } catch (error) {
      toast.error("Error fetching categories!");
    }
  };

  const handleAddCategory = async (values) => {
    setLoading(true);

    try {
      const { response, err } = await addCategory(values);
      toast.success("Category added successfully!");

      if (err) {
        toast.error("Error adding category!");
      } else {
        setCategories([...categories, response]);
        setModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error("Error adding category!");
    }

    setLoading(false);
  };

  const handleDeleteCategory = async (categoryId) => {
    setLoading(true);

    try {
      const { response, err } = await deleteCategory(categoryId);
      toast.success("Category deleted successfully!");

      if (err) {
        toast.error("Error deleting category!");
      } else {
        setCategories(
          categories.filter((category) => category._id !== categoryId)
        );
      }
    } catch (error) {
      toast.error("Error deleting category!");
    }

    setLoading(false);
  };

  const handleUpdateCategory = async (categoryId, values) => {
    setLoading(true);

    try {
      const { response, err } = await updateCategory(categoryId, values);
      toast.success("Category updated successfully!");

      if (err) {
        toast.error("Error updating category!");
      } else {
        const updatedCategories = categories.map((category) =>
          category._id === categoryId ? { ...category, ...values } : category
        );
        setCategories(updatedCategories);
        setModalVisible(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error("Error updating category!");
    }

    setLoading(false);
  };

  const handleEditButtonClick = (category) => {
    form.setFieldsValue(category);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
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
            <Button
              type="primary"
              onClick={() => handleEditButtonClick(category)}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteCategory(category._id)}
            >
              Delete
            </Button>
          </Flex>
        </div>
      ),
    },
  ];

  return (
    <Flex vertical gap={10} justify="end">
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        style={{ width: "250px" }}
      >
        Add Category
      </Button>
      <Table dataSource={categories} columns={columns} rowKey="_id" bordered />
      <Modal
        visible={modalVisible}
        title="Category"
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => {
              form.validateFields().then((values) => {
                if (form.getFieldValue("_id")) {
                  handleUpdateCategory(form.getFieldValue("_id"), values);
                } else {
                  handleAddCategory(values);
                }
              });
            }}
          >
            {form.getFieldValue("_id") ? "Save" : "Add"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="_id" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please enter the category name" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};

export default Category;
