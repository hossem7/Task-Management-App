// src/components/AddTasks/AddTasksModal.tsx
import React from 'react';
import Modal from 'antd/es/modal';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import styled from 'styled-components';
import { useTasks } from '../../context/TasksContext';


interface AddTasksModalProps {
  visible: boolean;
  onClose: () => void;
}

type FormValues = { title: string };

// instead of styling the Form component itself...
const FormWrapper = styled.div`
  .ant-form-item {
    margin-bottom: 16px;
  }
`;

export const AddTasksModal: React.FC<AddTasksModalProps> = ({
  visible,
  onClose,
}) => {
  const { addTask } = useTasks();
  // keep the default (unknown) generic so TS is happy
  const [form] = Form.useForm<FormValues>();

  const handleOk = async () => {
    try {
      // validateFields() still returns FormValues
      const values = await form.validateFields();
      await addTask(values.title);
      form.resetFields();
      onClose();
    } catch {
      // validation errors will render on the form
    }
  };

  return (
    <Modal
      title="Add New Task"
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      okText="Create"
      cancelText="Cancel"
      okButtonProps={{ type: 'primary' }}
    >
      <FormWrapper>
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Task Name"
            rules={[{ required: true, message: 'Please enter a task name' }]}
          >
            <Input placeholder="e.g. Buy groceries" />
          </Form.Item>
        </Form>
      </FormWrapper>
    </Modal>
  );
};