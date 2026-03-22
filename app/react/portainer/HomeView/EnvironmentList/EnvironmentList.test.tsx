import { http, HttpResponse } from 'msw';
import { render } from '@testing-library/react';

import { Environment } from '@/react/portainer/environments/types';
import { UserViewModel } from '@/portainer/models/user';
import { server } from '@/setup-tests/server';
import { withUserProvider } from '@/react/test-utils/withUserProvider';
import { withTestRouter } from '@/react/test-utils/withRouter';
import { withTestQueryProvider } from '@/react/test-utils/withTestQuery';

import { EnvironmentList } from './EnvironmentList';

test('when no environments for query should show empty list message', async () => {
  const { findByText } = await renderComponent(false, []);

  await expect(findByText('暂无可用环境。')).resolves.toBeVisible();
});

test('when user is not admin and no environments at all should show empty list info message', async () => {
  const { findByText } = await renderComponent(false, []);

  await expect(
    findByText(
      '您暂无任何环境的访问权限，请联系管理员。'
    )
  ).resolves.toBeVisible();
});

test('when user is an admin and no environments at all should show empty list info message', async () => {
  const { findByText } = await renderComponent(true);

  await expect(
    findByText(/暂无可管理的环境。请前往/)
  ).resolves.toBeVisible();
});

async function renderComponent(
  isAdmin = false,
  environments: Environment[] = []
) {
  const user = new UserViewModel({ Username: 'test', Role: isAdmin ? 1 : 2 });

  server.use(
    http.get('/api/endpoints', () =>
      HttpResponse.json(environments, {
        headers: {
          'x-total-available': environments.length.toString(),
          'x-total-count': environments.length.toString(),
        },
      })
    )
  );

  const Wrapped = withTestQueryProvider(
    withUserProvider(withTestRouter(EnvironmentList), user)
  );

  const queries = render(
    <Wrapped onClickBrowse={vi.fn()} onRefresh={vi.fn()} />
  );

  await expect(queries.findByText('环境')).resolves.toBeVisible();

  return queries;
}
