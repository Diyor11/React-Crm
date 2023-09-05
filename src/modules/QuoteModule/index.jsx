import { ErpLayout } from '../../layout';
import ErpPanel from '../../components/ErpPanel';
import QuoteForm from './QuoteForm';
import dataTableDropMenu from './dataTableDropMenu';

export default function InvoiceModule({ config }) {
  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        CreateForm={QuoteForm}
        UpdateForm={QuoteForm}
        dataTableDropMenu={dataTableDropMenu}
      ></ErpPanel>
    </ErpLayout>
  );
}
