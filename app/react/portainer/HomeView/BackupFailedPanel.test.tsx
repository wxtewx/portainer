import { http, HttpResponse } from 'msw';
import { render } from '@testing-library/react';

import { server } from '@/setup-tests/server';
import { isoDate } from '@/portainer/filters/filters';
import { withTestRouter } from '@/react/test-utils/withRouter';
import { withTestQueryProvider } from '@/react/test-utils/withTestQuery';

import { BackupFailedPanel } from './BackupFailedPanel';

test('when backup failed, should show message', async () => {
  const timestamp = 1500;

  const { findByText } = renderComponent({ failed: true, timestamp });

  await expect(
    findByText(
      `最新自动备份于 ${isoDate(
        timestamp
      )} 失败。详情请查看日志文件并参考`,
      { exact: false }
    )
  ).resolves.toBeVisible();
});

test("when user is using less nodes then allowed he shouldn't see message", async () => {
  const { findByText } = renderComponent({ failed: false });

  await expect(
    findByText('最新自动备份于', { exact: false })
  ).rejects.toBeTruthy();
});

function renderComponent({
  failed,
  timestamp,
}: {
  failed: boolean;
  timestamp?: number;
}) {
  server.use(
    http.get('/api/backup/s3/status', () =>
      HttpResponse.json({ Failed: failed, TimestampUTC: timestamp })
    )
  );

  const Wrapped = withTestQueryProvider(withTestRouter(BackupFailedPanel));

  return render(<Wrapped />);
}
