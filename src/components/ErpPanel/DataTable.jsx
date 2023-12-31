import React, { useCallback, useEffect } from 'react';
import { Dropdown, Table } from 'antd';
import { Button } from 'antd';
import {PageHeader} from '@ant-design/pro-layout'
import { EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '../../redux/erp/actions';
import { settings } from '../../redux/settings/actions';
import { selectListItems } from '../../redux/erp/selectors';
import { useErpContext } from '../../context/erp';
import uniqueId from '../../utils/uinqueId';

import { RedoOutlined, PlusOutlined } from '@ant-design/icons';
function AddNewItem({ config }) {
  const { ADD_NEW_ENTITY } = config;
  const { erpContextAction } = useErpContext();
  const { createPanel } = erpContextAction;
  const handelClick = () => {
    createPanel.open();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      {ADD_NEW_ENTITY}
    </Button>
  );
}

export default function DataTable({ config, dataTableDropMenu }) {
  let { entity, dataTableColumns } = config;
  const { DATATABLE_TITLE } = config;

  const {erpContextAction} = useErpContext()
  
  const dispatch = useDispatch();
  dataTableColumns = [
    ...dataTableColumns,
    {
      title: 'Actions',
      render: (row) => (
        <Dropdown menu={dataTableDropMenu({ row, entity, dispatch, erpContextAction })} trigger={['click']}>
          <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

  const { pagination, items } = listResult;


  const handelDataTableLoad = useCallback((pagination) => {
    const options = { page: pagination.current || 1 };
    dispatch(erp.list({ entity, options }));
  }, [dispatch, entity]);

  // const handelCurrency = () => {
  //   dispatch(settings.currency({ value: '€' }));
  //   dispatch(settings.currencyPosition({ position: 'before' }));
  // };
  useEffect(() => {
    dispatch(erp.list({ entity }));
  }, [dispatch, entity]);

  return (
    <>
      <PageHeader
        title={DATATABLE_TITLE}
        ghost={true}
        extra={[
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`} icon={<RedoOutlined />}>
            Refresh
          </Button>,
          // <Button onClick={handelCurrency} key={`${uniqueId()}`} icon={<RedoOutlined />}>
          //   Change Currency
          // </Button>,
          <AddNewItem config={config} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={items}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handelDataTableLoad}
      />
    </>
  );
}
