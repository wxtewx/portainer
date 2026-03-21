import { notifySuccess } from '@/portainer/services/notifications';

import { AddButton } from '@@/buttons';
import { DeleteButton } from '@@/buttons/DeleteButton';

import { EdgeGroup } from '../types';

import { useDeleteEdgeGroupsMutation } from './useDeleteEdgeGroupMutation';

export function TableActions({
  selectedItems,
}: {
  selectedItems: Array<EdgeGroup>;
}) {
  const removeMutation = useDeleteEdgeGroupsMutation();

  return (
    <div className="flex items-center gap-2">
      <DeleteButton
        confirmMessage="您是否要删除选中的边缘组？"
        disabled={selectedItems.length === 0}
        onConfirmed={() => handleRemove(selectedItems)}
        data-cy="remove-edge-group-button"
      />

      <AddButton data-cy="add-edge-group-button">添加边缘组</AddButton>
    </div>
  );

  async function handleRemove(selectedItems: Array<EdgeGroup>) {
    const ids = selectedItems.map((item) => item.Id);
    removeMutation.mutate(ids, {
      onSuccess: () => {
        notifySuccess('成功', '边缘组已删除');
      },
    });
  }
}
