import { useContext, useState } from "react";
import 'antd/dist/antd.css'
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {  Button, Checkbox, Form, Input, notification, Spin  } from 'antd';
import { showError } from "../alerts";


function ModalUserRegister(props:any) {
  const { signUp } = useContext(AuthContext);
  const [registeredUser,setRegisterUser] = useState(false)
  const onFinish = (values:any) => {
    setRegisterUser(true)
    signUp(values).then((res:any)=>{
      props.setIsModalOpen(false)
      setRegisterUser(false)
      notification.success({
        message: 'Tạo người dùng',
        description:"Người dùng đã được tạo thành công",
      });
    }).catch((err:any)=>{
      setRegisterUser(false)
      notification.error({
        message: 'Error',
        description:
          showError(err.response),
      });
    })

  };
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="">
      <Spin tip="Đang tạo người dùng...." spinning={registeredUser}>
        
        <Form
          name="basic"
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Tên"
            name="names"
            rules={[
                {
                required: true,
                message: 'Điền tên của bạn',
                },
                { type: 'string', min: 3,message:"Tên phải có ít nhất 3 ký tự chữ cái"}, 
                { type: 'string', max: 20,message:"Tên phải có tối đa 20 ký tự chữ cái"}, 

            ]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ"
            name="surnames"
            rules={[
              {
              required: true,
              message: 'Điền họ của bạn',
              },
              { type: 'string', min: 3,message:"Họ phải có ít nhất 3 ký tự chữ cái"}, 
              { type: 'string', max: 30,message:"Họ phải có tối đa 30 ký tự chữ cái"}, 

          ]}
            >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="document"
            rules={[
              {
              required: true,
              message: 'Nhập số điện thoại của bạn',
              },
              { type: 'string', min: 3,message:"Số điện thoại ít nhất 3 số"}, 
              { type: 'string', max: 10,message:"Số điện thoại nhiều nhất 10 số"}, 
              { pattern:/^[0-9]{1}[0-9]{5,9}$/,message:"Chỉ được bao gồm các ký tự số"}

          ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
              required: true,
              message: 'Nhập mật khẩu an toàn',
              },
              { type: 'string', min: 8,message:" Mật khẩu phải có ít nhất 8 ký tự"}, 
              { type: 'string', max: 30,message:"Mật khẩu phải tối đa 30 ký tự"}, 
              { pattern:/^[a-zA-ZÀ-ÿ \\u00f1 \\u00d1 \\s 0-9]+$/,message:"Mật khẩu không được có ký tự đặc biệt"}

          ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Spin>
      </div>
  );
}
export default ModalUserRegister;