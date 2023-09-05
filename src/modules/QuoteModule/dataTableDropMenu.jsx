
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import { erp } from '../../redux/erp/actions';

import { DOWNLOAD_BASE_URL } from '../../config/serverApiConfig';


export default function dataTableDropMenu({ row, entity, dispatch, erpContextAction }) {
  const { readPanel, updatePanel, modal } = erpContextAction;
  const tableKeys = {show: 'quote-table-show', edit: 'quote-table-edit', delete: 'quote-table-delete', download: 'quote-table-download'}

  function read() {
    dispatch(erp.currentItem({ data: row }));
    readPanel.open();
  }
  function edit() {
    dispatch(erp.currentAction({ actionType: 'update', data: row }));
    updatePanel.open();
  }
  function _delete() {
    dispatch(erp.currentAction({ actionType: 'delete', data: row }));
    modal.open();
  }
  function download() {
    window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${row._id}.pdf`, '_blank');
  }

  
  const handelClick = (e) => {
    switch (e.key) {
      case tableKeys.show:
        read()
        break;
      case tableKeys.edit:
        edit()
        break;
      case tableKeys.delete:
        _delete()
        break;
      case tableKeys.download:
        download()
        break;
      default:
        break;
    }
  }

  return {
    items: [
      {icons: <EyeOutlined />, label: 'Show', key: tableKeys.show},
      {icons: <EditOutlined />, label: 'Edit', key: tableKeys.edit},
      {icons: <FilePdfOutlined />, label: 'Download', key: tableKeys.download},
      {icons: <DeleteOutlined />, label: 'Delete', key: tableKeys.delete},
    ],
    onClick: handelClick
  }
}
