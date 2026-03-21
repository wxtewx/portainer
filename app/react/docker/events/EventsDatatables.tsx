import { createColumnHelper } from '@tanstack/react-table';
import { Clock } from 'lucide-react';
import { EventMessage } from 'docker-types';

import { isoDateFromTimestamp } from '@/portainer/filters/filters';

import { Datatable } from '@@/datatables';
import { createPersistedStore } from '@@/datatables/types';
import { useTableState } from '@@/datatables/useTableState';

import { createEventDetails } from './model';

const columnHelper = createColumnHelper<EventMessage>();

const typeMap: Record<EventMessage['Type'], string> = {
  container: '容器',
  network: '网络',
  volume: '数据卷',
  service: '服务',
  node: '节点',
  image: '镜像',
  plugin: '插件',
  secret: '密钥',
  config: '配置',
  daemon: '守护进程',
};

export const columns = [
  columnHelper.accessor('time', {
    header: '日期',
    cell: ({ getValue }) => {
      const value = getValue();
      return isoDateFromTimestamp(value);
    },
  }),
  columnHelper.accessor((c) => c.Type, {
    header: '类型',
    cell: ({ getValue }) => {
      return typeMap[getValue()] || getValue();
    },
  }),
  columnHelper.accessor((c) => createEventDetails(c), {
    header: '详情',
  }),
];

const tableKey = 'docker-events';
const settingsStore = createPersistedStore(tableKey, {
  id: 'Time',
  desc: true,
});

export function EventsDatatable({
  dataset,
}: {
  dataset?: Array<EventMessage>;
}) {
  const tableState = useTableState(settingsStore, tableKey);

  return (
    <Datatable
      dataset={dataset ?? []}
      isLoading={!dataset}
      columns={columns}
      settingsManager={tableState}
      title="事件"
      titleIcon={Clock}
      disableSelect
      data-cy="docker-events-datatable"
    />
  );
}
