import { useState, useEffect } from 'react';
import { /* useQuery,  */ useMutation, useQueryClient } from 'react-query';
import { useRouter, useDorothy, ToolMenuContainer } from 'dorothy-dna-react';
import axios from 'axios';
import { Box, TablePagination } from '@mui/material';

/* specific components */
import SubMenuRenderer from '../../components/SubMenuRenderer';
import Plus from '../../components/icons/Plus';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import Edit from '../../components/icons/Edit';
import Trash from '../../components/icons/Trash';
import Filters from '../../components/Filters';
import { filtersToURL } from '../../components/Filters/utils';
import ConfirmationDialog from './../../commons/components/ConfirmationDialog';

/* common components */
import Page from '../../commons/components/Page';
import TableBox from '../../commons/components/TableBox';
import { ID } from '../../commons/components/ui/renderers';

/* tool related */
import Manager from './manager';
import styles from './documents.module.scss';

const filterOptions = [
  {
    title: 'ultimas alterações',
    type: 'last',
    incompatibleWith: [],
  },
];

//temp
const data = {
  documents: [
    {
      id: 1,
      name: 'test1',
      category: 'catiguria1',
    },
  ],
  total: 1,
};

const Documents = () => {
  const { server } = useDorothy();
  const { /* currentCommunity, */ changeRoute, params } = useRouter();
  const queryClient = useQueryClient();

  const [page, _page] = useState(1);
  const [order, _order] = useState('name');
  const [direction, _direction] = useState('desc');
  const [perPage, _perPage] = useState(10);

  const [filters, _filters] = useState([]);
  const [, /* urlFilters */ _urlFilters] = useState('');
  const [isLastAFilter, _isLastAFilter] = useState(false);

  const [managing, _managing] = useState(null); /* null, 'novo' or producer id */

  const [toRemove, _toRemove] = useState(null);

  /*   const { data } = useQuery(
    ['documents_list', { community: currentCommunity.id, page, order, direction, perPage, urlFilters }],
    {
      queryFn: async () =>
        (
          await axios.get(
            `${server}product/?communityId=${currentCommunity.id}${urlFilters}&page=${page}&order=${order}&direction=${
              direction === 'asc' ? 'desc' : 'asc'
            }&limit=${perPage}`,
          )
        ).data,
    },
  ); */

  const mutations = {
    remove: useMutation(
      entity => {
        return axios.delete(`${server}documents/${entity.id}`);
      },
      { onSuccess: () => queryClient.invalidateQueries('documents_list') },
    ),
  };

  useEffect(() => {
    console.log('params', params);
    if (!params) return;
    if (params.length) _managing(params[0]);
    else _managing(null);
  }, [params]);

  useEffect(() => {
    if (!filters) return;

    _isLastAFilter(filters.find(f => f.type === 'last'));
    _urlFilters(filtersToURL(filters));
    _page(1);
    _order('name');
    _direction('desc');
  }, [filters]);

  const orderBy = defaultOrder => columnName => {
    _page(1);
    if (order === columnName) _direction(direction === 'asc' ? 'desc' : 'asc');
    else {
      _order(columnName);
      _direction(defaultOrder || 'asc');
    }
  };

  const handleRemove = entity => {
    _toRemove(entity);
  };

  const handleConfirmation = async action => {
    if (action === 'confirm') await mutations.remove.mutateAsync(toRemove);

    _toRemove(null);
  };

  const columns = [
    {
      field: 'id',
      label: 'ID',
      sortable: true,
      renderer: ID,
    },
    {
      field: 'name',
      label: 'Nome',
      sortable: true,
    },
    {
      field: 'category',
      label: 'Categoria',
      sortable: true,
    },
  ];

  const actions = [
    {
      label: 'Editar',
      onClick: row => changeRoute({ params: [row.id] }),
      icon: <Edit />,
    },
    {
      label: 'Remover',
      onClick: row => handleRemove(row),
      icon: <Trash />,
    },
  ];

  const pageSidebar = (
    <>
      <div className="sidebar-body">
        <ToolMenuContainer submenu>
          <SubMenuRenderer />
        </ToolMenuContainer>
      </div>
      <div className="sidebar-body">
        <Filters filters={filters} options={filterOptions} onChange={_filters} dateRange={false} />
      </div>
    </>
  );

  const pageHeader = (
    <>
      <PageTitle title={`Central de documentos ${data ? `(${data.total})` : ''}`} />
      <div className="page-header-buttons">
        <div>
          <button className="button-primary" onClick={() => changeRoute({ params: ['novo'] })}>
            <Plus></Plus>
            adicionar
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Page fixed={true} pageHeader={pageHeader} pageSidebar={pageSidebar}>
        {data && (
          <>
            <TableBox
              columns={columns}
              actions={actions}
              data={data.documents}
              canSort={isLastAFilter}
              order={order} // ordenado por este field
              direction={direction}
              onSearchChange={console.log}
              onChangeOrder={orderBy}
            />

            <Manager
              open={!!managing}
              id={managing}
              onClose={() => console.log('Index -> onClose') /* changeRoute({ params: [] }) */}
              onSave={() => console.log('Index -> onSave') /*  changeRoute({ params: [] }) */}
            />

            {!isLastAFilter && (
              <TablePagination
                className="pagination"
                component="div"
                count={data.total}
                page={page - 1}
                onPageChange={(...args) => _page(args[1] + 1)}
                rowsPerPage={perPage}
                rowsPerPageOptions={[10, 20, 50, 100]}
                onRowsPerPageChange={e => {
                  _perPage(e.target.value);
                  _page(1);
                }}
              />
            )}
          </>
        )}
      </Page>

      <Box display="flex" justifyContent="space-between"></Box>

      <ConfirmationDialog
        open={!!toRemove}
        content="Confirma a remoção desta registro?"
        confirmButtonText="Remover"
        onClose={handleConfirmation}
      />
    </>
  );
};

export default Documents;
