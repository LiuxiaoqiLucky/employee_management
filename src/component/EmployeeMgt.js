import React,{Component} from 'react';
import '../config/config.js';
import axiosutil from  '../axios/axiosutil.js';
import {Card, Button, Table, Form, Input, Select, Modal} from 'antd';
import '../css/antd.css';
import EmployeeForm from './EmployeeForm';

export default class EmployeeMgt extends Component{
	constructor(props){
		super(props);
		this.state = { 
			list:[]
		} 
	}

	componentDidMount(){
		this.getEmployeeInfoData();
	}

    getEmployeeInfoData = ()=>{
		axiosutil.ajax({
			url:'/empinfo/all',
			method:'get',
			data:{
				params:{
					//
				}
			}
		}).then((res)=>{
			this.setState({
				list: res.result.map((employee, index)=>{
					employee.key = index;
					return employee;
				})
				//list: res.result
			})
		})
	}

	handleOperate = (type, item)=>{
		if(type ==='create'){
            this.setState({
                title:'添加雇员',
                isVisible:true,
                type
            })
        }else if(type==="edit"){
            this.setState({
                title:'编辑雇员',
                isVisible:true,
                employeeInfo:item,
                type
            })
        }else if(type==="delete"){
            Modal.confirm({
                title:'确定要删除此雇员吗？',
                onOk:()=>{
                    axiosutil.ajax({
                        url:'/empinfo/' + item.id,
                        method:'delete',
                        data:{
                            params:{
                            	//id:item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code === 0){
                            this.setState({
                                isVisible:false
                            });
                            this.getEmployeeInfoData();
                        }
                    })
                },
                onCancel:()=>{
                }
            })
        }
	};

	handleSubmit = ()=>{
		let type = this.state.type;
        let employeeInfo = this.employeeForm.props.form.getFieldsValue();
        axiosutil.ajax({
            url:type === 'create'?'/empinfo/add':'/empinfo/edit',
            method:type === 'create'?'post':'put',
            data:{
                params:{
                	//...employeeInfo
                },
				employeeInfo
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    isVisible:false
                });
                this.getEmployeeInfoData();
            }
        })
	}

	render(){
		const columns = [{
				title: 'id',
				dataIndex: 'id',
				width: 80,
				align: 'center'
			}, {
				title: 'FirstName',
				dataIndex: 'firstName',
				width: 200
			}, {
				title: 'LastName',
				dataIndex: 'lastName',
				width: 200
			}, {
				title: 'DeptName',
				dataIndex: 'departmentName',
				width: 200
			}, {
				title: 'EmailAddr',
				dataIndex: 'emailAddress',
				width: 200
			}, {
				title: 'FamilyAddr',
				dataIndex: 'familyAddress',
				width: 200
			}, {
				title: 'RegDate',
				dataIndex: 'regDate',
				width: 200
			}, {
				title: 'Operate',
				render: (txt, record, index) =>{
					return (
						<div>
							<Button type="primary" size="small" onClick={()=>this.handleOperate('edit', record)}>编辑</Button>&nbsp;&nbsp;
							<Button type="danger" size="small" onClick={()=>this.handleOperate('delete', record)}>删除</Button>
						</div>
					)
				}
			}
		];
		return (
			<div>
				<Card style={{marginTop:10}}>
					<Button type="primary" icon="+" style={{marginLeft:35}} onClick={()=>this.handleOperate('create', '')}>新增雇员</Button>
				</Card>		
				<div className="content-wrap">
					<Table 
						columns={columns}
						dataSource={this.state.list}
						bordered
						{...this.props}
						pagination={false} //设置取消分页
					/>
				</div>
				<Modal
					title={this.state.title}
					visible={this.state.isVisiable}
					onOk={this.handleSubmit}
					onCancle={()=>{
						this.employeeForm.props.form.resetFields();
						this.setState({
							isVisible: false,
							employeeInfo:''
						})
					}}
				>
					<EmployeeForm employeeInfo={this.state.employeeInfo} type={this.state.type} wrappedComponentRef={(inst) => this.employeeForm = inst }/>
				</Modal>
			</div>
		);
	}
}

