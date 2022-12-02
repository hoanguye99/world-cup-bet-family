import { Button, Form, Input, Modal, notification } from "antd";
import "antd/dist/antd.css";
import { useContext, useState } from "react";
import { showError } from "../alerts";
import { AuthContext } from "../context/AuthContext";
import ModalUserRegister from "./ModalUserRegister";

function LoginPage() {
  const { signin } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    signin(values)
      .then((res: any) => {})
      .catch((err: any) => {
        notification.error({
          message: "Error",
          description: showError(err.response),
        });
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login select-none">
      <img
        src="https://q22b2ctemplates.blob.core.windows.net/dev/images/q22.svg"
        className="img-logo-login"
        alt=""
      />
      <div className="form-login">
        <h1>FIS ESS 2022 World Cup</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="SĐT"
            name="document"
            rules={[
              {
                required: true,
                message: "Nhật số điện thoại",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu TK"
            name="password"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>

            <Button type="link" onClick={() => setIsModalOpen(true)}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        footer={[]}
        title="Đăng ký tài khoản"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ModalUserRegister setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
}
export default LoginPage;
