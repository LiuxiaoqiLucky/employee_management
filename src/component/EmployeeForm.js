import React,{Component} from 'react';
import '../config/config.js';
import {Form, Input} from 'antd';
import '../css/antd.css';

const FormItem = Form.Item;

class EmployeeForm extends React.Component{
	render(){
        //const{form:{getFieldDecorator}}=this.props
        const {form} = this.props;
        const { getFieldDecorator } = form;
        //const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const employeeInfo = this.props.employeeInfo || {};
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="FirstName" {...formItemLayout}>
                    {
                        employeeInfo && type=='edit'?employeeInfo.firstName:
                        getFieldDecorator('firstName',{
                            initialValue:employeeInfo.firstName
                        })(
                            <Input type="text" placeholder="请输入FirstName"/>
                        )
                    }
                </FormItem>
                <FormItem label="LastName" {...formItemLayout}>
                    {
                        employeeInfo && type=='edit'?employeeInfo.lastName:
                        getFieldDecorator('lastName',{
                            initialValue:employeeInfo.lastName
                        })(
							<Input type="text" placeholder="请输入LastName"/>
                    )}
                </FormItem>
                <FormItem label="DeptName" {...formItemLayout}>
                    {
                        employeeInfo && type=='edit'?employeeInfo.departmentName:
                            getFieldDecorator('departmentName',{
                                initialValue:employeeInfo.departmentName
                            })(
                                <Input type="text" placeholder="请输入部门名称"/>
                            )}
                </FormItem>
                <FormItem label="EmailAddr" {...formItemLayout}>
                    {
                        employeeInfo && type=='edit'?employeeInfo.emailAddress:
                        getFieldDecorator('emailAddress',{
                            initialValue:employeeInfo.emailAddress
                        })(
							<Input type="text" placeholder="请输入邮箱地址"/>
                    )}
                </FormItem>
                <FormItem label="FamilyAddr" {...formItemLayout}>
                    {
                        employeeInfo && type=='edit'?employeeInfo.familyAddress:
                        getFieldDecorator('familyAddress',{
                            initialValue:employeeInfo.familyAddress
                        })(
                        <Input.TextArea rows={3} placeholder="请输入家庭住址"/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
export default EmployeeForm;