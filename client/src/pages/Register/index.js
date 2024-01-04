import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import ColumnTitle from '../../components/ColumnTitle';
import Divider from '../../components/Divider';

function Register() {
	const onFinish = (values) => {
		console.log('Success: ', values);
	};
	return (
		<div className="grid grid-cols-2">
			<div className="bg-primary h-screen flex flex-col justify-center items-center">
				<ColumnTitle />
			</div>
			<div className="flex justify-center items-center">
				<div className="w-[400px]">
					<h1 className="text-2xl text-gray-700 uppercase">
						LET'S GET YOU STARTED
					</h1>
					<span></span>
					<Divider />
					<Form layout="vertical" onFinish={onFinish}>
						<Form.Item label="First Name" name="firstName">
							<Input />
						</Form.Item>
						<Form.Item label="Last Name" name="lastName">
							<Input />
						</Form.Item>
						<Form.Item label="Email" name="email">
							<Input />
						</Form.Item>
						<Form.Item label="Password" name="password">
							<Input type="password" />
						</Form.Item>
						<Button type="primary" htmlType="submit" block>
							Register
						</Button>
						<div className="flex justify-center mt-5">
							<span>
								Already have an account?{' '}
								<Link to="/login">Login</Link>
							</span>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default Register;
